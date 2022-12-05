const db = require('../db/db');

class User{

async addUser(body){
    await db.query(`INSERT INTO users (firstname,lastname,email,password,sex) VALUES( $1, $2, $3, $4, $5 )`,[body.firstname,body.lastname,body.email,body.password,body.sex]);
    const user = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password
    };
    return user;
};

async doIExist(email,password){
    const user = await (await db.query(`SELECT email, password from "public"."users" WHERE email = $1 AND password = $2`,[email,password])).rows;
    if(user.length === 0){
            return null
        };
    const authentificatedUser = {
        email : user[0].email,
        password : user[0].password
    }
    return authentificatedUser;
}


}
module.exports = {User};