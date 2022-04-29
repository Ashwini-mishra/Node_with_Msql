const db = require("../../config/db");

/******************* create comments accourding to post id ************** */
const createComments = async(req, res) => {
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
            const splQuery = "SELECT * FROM user_post WHERE id = ?";
            /*************** check post is available or not ********* */
            await db.query(splQuery, req.params.postId,async(err, userPost)=>{
                if(userPost.length < 0 ){
                    return res.status(200).send({ message : "Post Not Available" });
                }

                const post = {
                    user_email: info[0].email,
                    post_id: userPost[0].id,
                    comments: req.body.comments,
                    isActive: true,
                };
                const splQuery = "INSERT INTO post_comments SET ?";
                /****************** create comment on post ********* */
                await db.query(splQuery, post,(err, comments)=>{
                    if(err){
                        return res.status(200).send({ message : "Not created" });
                    }
                    return res.status(200).json({ message: `Commented On The Post Id = ${req.params.postId}`, createdData: comments.affectedRows });
                });
            });
        });
    } catch (err) {
        return err.message
    }
}


/*************** update comments by its id ************** */
const update = async(req, res) => {
    try {
        let sql = "SELECT * FROM user WHERE email = ?";
        /************* check user exist or not *********** */
        await db.query(sql, res.locals.email,async(err, info)=>{
            if(err){
                return res.status(404).send({ message: "Not found" });
            }
            if(info.length < 0 ){
                return res.status(404).send({ message: "User Not Exist" });
            }

            const splQuery = "UPDATE post_comments SET comments = ? WHERE id = ?";
            /*************** update the comment *********** */
            await db.query(splQuery, [ req.body.comments, req.params.id ],async(err, info)=>{
                if(err){
                    return res.status(200).send({ message : "Comment Not Available" });
                }
                return res.status(200).json({ message: "Comment Updated Successfully", updatedData: info.message });
            });
        });
    } catch (err) {
        return err.message
    }
}

/***************** soft delete comments by its id ************ */
const deleteComment = async(req, res) => {
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
            const splQuery = "UPDATE post_comments SET isActive = ?  WHERE id = ?";
            /****************** soft delete the comment ************** */
            await db.query(splQuery, [ false, req.params.id ],async(err, info)=>{
                if(err){
                    return res.status(200).send({ message : "Comment Not Available" });
                }
                return res.status(200).json({ message: "Comment Deleted Successfully", updatedData: info.message });
            });
        });
    } catch (err) {
        return err.message
    }
}


module.exports = {
    createComments,
    update,
    deleteComment
}
