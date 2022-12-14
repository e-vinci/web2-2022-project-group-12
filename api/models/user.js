/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/db');

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

class User {
  //  Permet d'ajouter un user //
  async addUser(body) {
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    await db.query(
      `INSERT INTO projetWeb.users (first_name,last_name,email,password,sex) VALUES( $1, $2, $3, $4, $5 )`,
      [body.firstname, body.lastname, body.email.toLowerCase(), hashedPassword, body.sex],
    );
    const user = {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email.toLowerCase(),
      password: hashedPassword,
    };
    return user;
  }

  // Recupere l'email, l'id et le password d'un user et verifie donc si il existe bien dans la db grace à l'email //
  async doIExist(email, password) {
    const user = await (
      await db.query(
        `SELECT u.email, u.password, u.id_user, u.first_name, u.last_name, u.sex FROM projetWeb.users u WHERE u.email = $1`,
        [email.toLowerCase()],
      )
    ).rows;
    if (user.length === 0) {
      return null;
    }
    if (!bcrypt.compareSync(password, user[0].password)) {
      return null;
    }

    const emailUser = user[0].email.toLowerCase();
    const token = jwt.sign(
      { emailUser }, // session data added to the payload (payload : part 2 of a JWT)
      jwtSecret, // secret used for the signature (signature part 3 of a JWT)
      { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
    );
    const authentificatedUser = {
      token,
      userId: user[0].id_user,
      email: emailUser,
      password: user[0].password,
      firstName: user[0].first_name,
      lastName: user[0].last_name,
      sex: user[0].sex,
    };
    return authentificatedUser;
  }

  async getOneUserByEmail(body) {
    const user = await (
      await db.query(`SELECT * FROM projetWeb.users u WHERE U.email = $1`, [body.email])
    ).rows;
    return user[0];
  }

  // Permet de recupere un utilisateur grace à son id //
  async getOneUser(id) {
    const user = await (
      await db.query(`SELECT * FROM projetWeb.users u WHERE U.id_user = $1`, [id])
    ).rows;
    return user[0];
  }

  // Permet l'ajout d'une adresse dans la base des données //
  async addAdress(data) {
    const adress = await db.query(
      `INSERT INTO projetWeb.adresses (country,city,zip_code,street,number) VALUES($1,$2,$3,$4,$5) RETURNING id_adress`,
      [data.country, data.city, data.zipCode, data.street, data.building],
    );
    const idAdress = {
      adress: adress.rows[0].id_adress,
    };
    return idAdress;
  }

  // Permet d'ajouter un vendeur dans la base des données en recuperant l'id du utilisateur connecté //
  async beSeller(body) {
    // Creeation de l'adresse par les données fournies dans le body,
    // renvoie l'id de la derniere adresse crée pour l'insere comme FOREIGN KEY dans la db //
    const idAdress = this.addAdress(body);

    await db.query(
      `INSERT INTO projetWeb.seller (store_name,id_adress,id_user) VALUES ($1,$2,$3)`,
      [body.storeName, (await idAdress).adress, body.userID],
    );
  }

  // Permet de recuperer un vendeur de la base des données par le moyen de son id //
  async getStore(id) {
    const seller = await (
      await db.query(
        `SELECT u.first_name, u.last_name, u.email, s.store_name, s.id_user, p.* FROM projetWeb.products p, projetWeb.users u, projetWeb.seller s  WHERE p.id_user = u.id_user AND u.id_user = s.id_user AND s.id_user = $1`,
        [id],
      )
    ).rows;
    // fixer les photos pour utiliser cette requete => await db.query(`SELECT u.first_name, u.last_name, u.email, s.store_name, s.id_user, ph.url as "photoURL", p.* FROM projetWeb.products p, projetWeb.users u, projetWeb.seller s, projetWeb.photos_users ph WHERE p.id_user = u.id_user AND ph.id_user = u.id_user AND u.id_user = s.id_user AND s.id_user = $1`,[id],)).rows;
    if (seller.length === 0) {
      return null;
    }
    return seller;
  }

  // Permet de recuperer un id d'un vendeur de la base des données par le moyen d'un id, sert pour une verification dans UserPage//
  async getIdStore(id) {
    const seller = await (
      await db.query(`SELECT DISTINCT s.id_user FROM projetWeb.seller s WHERE s.id_user = $1`, [id])
    ).rows;
    console.log('yoyoy', seller);
    if (seller.length === 0) {
      console.log('je suiss paspaspapspasé');
      return null;
    }
    return seller;
  }

  async updateUserFirstName(body) {
    await db.query('UPDATE projetWeb.users SET first_name = $1 WHERE id_user = $2', [
      body.firstName,
      body.id,
    ]);
  }

  async updateUserLastName(body) {
    await db.query('UPDATE projetWeb.users SET last_name = $1 WHERE id_user = $2', [
      body.lastName,
      body.id,
    ]);
  }


  async updateUserPassword(body) {
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    await db.query('UPDATE projetWeb.users SET password = $1 WHERE id_user = $2', [
      hashedPassword,
      body.id,
    ]);
  }


  /* ce truc wola il semblait simple mais enft non woyaaaa */
  async deleteUser(body) {
    await await db.query(
      `DELETE FROM projetWeb.seller WHERE id_user IN (SELECT id_user FROM projetWeb.users WHERE id_user = $1);`,
      [body],
    );
    await await db.query(
      `
      DELETE FROM projetWeb.product_reviews WHERE id_user IN (SELECT id_user FROM projetWeb.users WHERE id_user = $1);`,
      [body],
    );
    await await db.query(
      `
      DELETE FROM projetWeb.photos_users WHERE id_user IN (SELECT id_user FROM projetWeb.users WHERE id_user = $1);`,
      [body],
    );
    await await db.query(
      `
      DELETE FROM projetWeb.products WHERE id_user IN (SELECT id_user FROM projetWeb.users WHERE id_user = $1);`,
      [body],
    );
    await await db.query(
      `
      DELETE FROM projetWeb.orders WHERE id_user IN (SELECT id_user FROM projetWeb.users WHERE id_user = $1);`,
      [body],
    );
    await await db.query(
      `
      DELETE FROM projetWeb.users WHERE id_user IN (SELECT id_user FROM projetWeb.users WHERE id_user = $1);`,
      [body],
    );
    await await db.query(`DELETE FROM projetWeb.users WHERE id_user = $1`, [body]);
  }
  
}


module.exports = { User };
