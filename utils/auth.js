const jwt = require("jsonwebtoken");
require("dotenv").config();

/******* to authenticate token ******* */
const authenticate = async(req , res , next) => {
    try{
        let decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET_KEY
        );
        // console.log(decoded);
        res.locals.email = decoded.email;
        res.locals.name = decoded.name;

        if (!decoded) {
          return res.status(403).send({ message: "Unauthenticated User" });
        }
        next();
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
};

/** to generate token */
function generateAccessToken(info) {
    try{
        const data = {
          email: info.email,
          name: info.name,
        }
        return jwt.sign(data, `${process.env.JWT_SECRET_KEY}`);
    }catch(err) {
        return err.message;
    }
}

module.exports = { authenticate, generateAccessToken };
