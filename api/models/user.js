const db = require('../db/db');
const bcrypt = require("bcrypt");
const saltRounds = 10;

class User{

async addUser(body){
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    await db.query(`INSERT INTO users (firstname,lastname,email,password,sex) VALUES( $1, $2, $3, $4, $5 )`,[body.firstname,body.lastname,body.email,hashedPassword,body.sex]);
    const user = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: hashedPassword,
    };
    return user;
};

}
module.exports = {User};