const db = require("../../config/db");

/************* create user ********** */
const create = async(req,res) => {
    try {
        if(req.body.password !== req.body.confirmPassword){
            return res.status(400).send({ message: "Confirm Passwod and Password Not Matched" });
        }
        const sql = "SELECT * FROM user WHERE email = ?";
        /*************** check user already exist or not ********** */
        await db.query(sql, req.body.email,async (err, info)=>{
            if(err){
                return res.status(404).send({ message: "Error Occoured" });
            }
            let post = { email: req.body.email, name: req.body.name, password: req.body.password };
            if(info.length > 0 ){
                return res.status(404).send({ message: "User Already Exist" });
            }
            const splQuery = "INSERT INTO user SET ?";
            await db.query(splQuery, post,(err, info)=>{
                if(err){
                    return res.status(200).send({ message : "Not created" });
                }
                return res.status(200).json({ message: "User Created Successfully", createdData: info.affectedRows });
            });
        });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}


module.exports = { create }
