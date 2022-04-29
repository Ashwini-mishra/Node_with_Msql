const db = require("./config/db");

/************ data base queries *********** */
const postSql = "CREATE TABLE IF NOT EXISTS user_post(id int AUTO_INCREMENT, name VARCHAR(255), post VARCHAR(255),discription VARCHAR(255), user_email VARCHAR(255), isActive TINYINT ,  PRIMARY KEY(id))";
const userSql = "CREATE TABLE IF NOT EXISTS user(id int AUTO_INCREMENT, email VARCHAR(255), name VARCHAR(255), password VARCHAR(255),  PRIMARY KEY(id))";
const commentsSql = "CREATE TABLE IF NOT EXISTS post_comments(id int AUTO_INCREMENT,comments VARCHAR(255), user_email VARCHAR(255), post_id VARCHAR(255), isActive TINYINT,  PRIMARY KEY(id))";

const sql = [ postSql, userSql, commentsSql ];
sql.map( table => {
    db.query(table, (err) => {
        if (err) {
        throw err;
        }
    });
});
module.exports = db;
