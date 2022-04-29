const db = require("../../config/db");
const auth = require("../../utils/auth");

/*************** login ********** */
const login = async(req, res) => {
    try {
        let sql = "SELECT * FROM user WHERE email = ?";
        await db.query(sql, req.body.email,async(err, info)=>{
            if(err){
                return res.status(404).send({ message: "Not found" });
            }
            const data = {
                email: info[0].email,
                name: info[0].name,
            }
            const token = await auth.generateAccessToken(data);
            return res.status(200).json({ data: info , token: token });
        });
    } catch (err) {
        return err.message
    }
}

module.exports = { login }
