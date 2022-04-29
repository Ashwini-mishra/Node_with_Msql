const db = require("../../config/db");

/******************* create post ************** */
const createPost = async(req, res) => {
    try {
        let sql = "SELECT * FROM user WHERE email = ?";
        await db.query(sql, res.locals.email,async(err, info)=>{
            if(err){
                return res.status(404).send({ message: "Not found" });
            }
            /********** check user exist or not ******* */
            if(info.length < 0 ){
                return res.status(404).send({ message: "User Not Exist" });
            }

            const post = {
                user_email: info[0].email,
                name: info[0].name,
                post: req.body.post,
                discription: req.body.discription,
                isActive: true,
            };
            const splQuery = "INSERT INTO user_post SET ?";
            await db.query(splQuery, post,(err, info)=>{
                if(err){
                    return res.status(200).send({ message : "Not created" });
                }
                return res.status(200).json({ message: "Post Uploaded Successfully", createdData: info.affectedRows });
            });
        });
    } catch (err) {
        return err.message
    }
}

/************** get all post **************** */
const getAllPost = async(req, res) => {
    try {
        let sql = "SELECT * FROM user WHERE email = ?";
        /************** check user exist or not authenticate through token ************* */
        await db.query(sql, res.locals.email,async(err, info)=>{
            if(err){
                return res.status(404).send({ message: "Not found" });
            }
            if(info.length < 0 ){
                return res.status(404).send({ message: "User Not Exist" });
            }
            const splQuery = "SELECT * FROM user_post WHERE user_email = ? AND isActive = ?";
            /*************** select logined user post *********** */
            await db.query(splQuery, [info[0].email,true],(err, info)=>{
                if(err){
                    return res.status(200).send({ message : "Post Not Available" });
                }
                return res.status(200).json({ message: "Post Fetch Successfully", createdData: info });
            });
        });
    } catch (err) {
        return err.message
    }
}

/*************** update post by post id ************** */
const updatePost = async(req, res) => {
    try {
        let sql = "SELECT * FROM user WHERE email = ?";
        /************** check user exist or not authenticate through token ************* */
        await db.query(sql, res.locals.email,async(err, info)=>{
            if(err){
                return res.status(404).send({ message: "Not found" });
            }
            if(info.length < 0 ){
                return res.status(404).send({ message: "User Not Exist" });
            }
            const splQuery = "SELECT * FROM user_post WHERE user_email = ? AND isActive = ? AND id = ?";
            /*************** select logined user post and check post is available or not   *********** */
            await db.query(splQuery, [info[0].email, true, req.params.id],async(err, info)=>{
                if(info.length < 0){
                    return res.status(200).send({ message : "Post Not Available" });
                }
                const splQuery = "UPDATE user_post SET post = ?, discription = ?  WHERE id = ?";
                /*************** update the post *********** */
                await db.query(splQuery, [ req.body.post, req.body.discription, req.params.id ],async(err, info)=>{
                    if(err){
                        return res.status(200).send({ message : "Post Not Available" });
                    }
                    return res.status(200).json({ message: "Post Updated Successfully", updatedData: info.message });
                });
            });
        });
    } catch (err) {
        return err.message
    }
}

/***************** soft delete post by its id ************ */
const deletePost = async(req, res) => {
    try {
        let sql = "SELECT * FROM user WHERE email = ?";
        /************** check user exist or not authenticate through token ************* */
        await db.query(sql, res.locals.email,async(err, info)=>{
            if(err){
                return res.status(404).send({ message: "Not found" });
            }
            if(info.length < 0 ){
                return res.status(404).send({ message: "User Not Exist" });
            }
            const splQuery = "SELECT * FROM user_post WHERE user_email = ? AND isActive = ? AND id = ?";
            /*************** select logined user post and check post is available or not   *********** */
            await db.query(splQuery, [info[0].email, true, req.params.id],async(err, info)=>{
                if(info.length < 0){
                    return res.status(200).send({ message : "Post Not Available" });
                }
                const splQuery = "UPDATE user_post SET isActive = ?  WHERE id = ?";
                /****************** soft delete the post ************** */
                await db.query(splQuery, [ false, req.params.id ],async(err, info)=>{
                    if(err){
                        return res.status(200).send({ message : "Post Not Available" });
                    }
                    return res.status(200).json({ message: "Post Updated Successfully", updatedData: info.message });
                });
            });
        });
    } catch (err) {
        return err.message
    }
}

/************** get post and its comments ************* */
const getById = async(req, res) => {
    try {
        let sql = "SELECT * FROM user WHERE email = ?";
         /************** check user exist or not authenticate through token ************* */
        await db.query(sql, res.locals.email,async(err, info)=>{
            if(err){
                return res.status(404).send({ message: "Not found" });
            }
            if(info.length < 0 ){
                return res.status(404).send({ message: "User Not Exist" });
            }
            const splQuery = "SELECT * FROM user_post WHERE id = ?";
            /***************** select the post id ************* */
            await db.query(splQuery, [req.params.id],async(err, info)=>{
                if(info.length < 0){
                    return res.status(200).send({ message : "Post Not Available" });
                }
                const splQuery = "SELECT * FROM post_comments WHERE post_id = ? AND isActive = ?";
                /***************** select the comments according to post id ********* */
                await db.query(splQuery, [ req.params.id, true ],async(err, comment)=>{
                    if(err){
                        return res.status(200).send({ message : "Comments Not Available" });
                    }
                    return res.status(200).json({ message: "Post fetch Successfully", updatedData: info, comment : comment });
                });
            });
        });
    } catch (err) {
        return err.message
    }
}

module.exports = {
    createPost,
    getAllPost,
    updatePost,
    deletePost,
    getById,
}
