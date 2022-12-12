/* eslint-disable class-methods-use-this */
 const bcrypt = require("bcrypt");
const db = require('../db/db');

 const saltRounds = 10;

class User{
    
    //  Permet d'ajouter un user //
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

    // Recupere l'email, l'id et le password d'un user et verifie donc si il existe bien dans la db grace à l'email //
    async doIExist(email,password){
        const user = await (await db.query(`SELECT LOWER(u.email), u.password, u.id_user FROM projetWeb.users u WHERE LOWER(u.email) = $1`,[email.toLowerCase()])).rows;
        if(user.length === 0){
                return null
        }
        if(!(bcrypt.compareSync(password, user[0].password))){
            console.log("mots de passe ne matchents pas");
            return null;
        }
        const authentificatedUser = {
            userId : user[0].id_user,
            email : user[0].email,
            password : user[0].password
        }
        return authentificatedUser;
    };

    // Permet de recupere un utilisateur grace à son id //
    async getOneUser(id){
        const user = await (await db.query(`SELECT * FROM projetWeb.users u WHERE U.id_user = $1`, [id])).rows;
        return user[0];
    };


    // Permet l'ajout d'une adresse dans la base des données //
    async addAdress(data){
        const adress = await db.query(`INSERT INTO projetWeb.adresses (country,city,zip_code,street,number) VALUES($1,$2,$3,$4,$5) RETURNING id_adress`,[data.country,data.city,data.zipCode,data.street,data.building]);
        const idAdress = adress.rows[0].id_adress;
        return idAdress;
    };

    // Permet d'ajouter un vendeur dans la base des données en recuperant l'id du utilisateur connecté //
    async beSeller(body){
        
        // Creeation de l'adresse par les données fournies dans le body, 
        // renvoie l'id de la derniere adresse crée pour l'insere comme FOREIGN KEY dans la db //
        const idAdress = this.addAdress(body);

        await db.query(`INSERT INTO projetWeb.seller (store_name,id_adress,id_user)`,[body.storeName, idAdress, body.userID]);
        
    };

    // Permet de recuperer un vendeur de la base des données par le moyen de son id //
    async getSeller(id){
        const seller = await (await db.query(`SELECT u.*, s.* FROM projetWeb.users u, projetWeb.seller s WHERE u.id_user = s.id_user AND s.id_user = $1`,[id])).rows;
        return seller[0];
    }

}


module.exports = {User};