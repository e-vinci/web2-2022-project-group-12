const db = require('../db/db');

class User{

async addUser(body){
    await db.query(`INSERT INTO users (firstname,lastname,email,password,sex) VALUES( $1, $2, $3, $4, $5 )`,[body.firstname,body.lastname,body.email,body.password,body.sex]);
    let user = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password
    };
    return user;
};

}
module.exports = {User};