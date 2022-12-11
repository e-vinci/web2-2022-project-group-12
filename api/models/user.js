/* eslint-disable class-methods-use-this */
 const bcrypt = require("bcrypt");
const db = require('../db/db');

 const saltRounds = 10;

class User{

    async addUser(body){
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        await db.query(`INSERT INTO projetWeb.users (first_name,last_name,email,password,sex) VALUES( $1, $2, $3, $4, $5 )`,[body.firstname,body.lastname,body.email.toLowerCase(),hashedPassword,body.sex]);
        const user = {
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: hashedPassword
        };
        return user;
    };

    async doIExist(email,password){
        const user = await (await db.query(`SELECT LOWER(u.email), u.password FROM projetWeb.users u WHERE LOWER(u.email) = $1`,[email.toLowerCase()])).rows;
        if(user.length === 0){
                return null
        }
        if(!(bcrypt.compareSync(password, user[0].password))){
            console.log("mots de passe ne matchents pas");
            return null;
        }
        const authentificatedUser = {
            email : user[0].email,
            password : user[0].password
        }
        return authentificatedUser;
    };

    async getOneUser(id){
        const user = await (await db.query(`SELECT * FROM projetWeb.users u WHERE U.id_user = $1`, [id])).rows;
        return user[0];
    };

}


module.exports = {User};