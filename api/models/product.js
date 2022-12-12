/* eslint-disable class-methods-use-this */
const db = require('../db/db');

class Product {
  // Permet de recuperer tous les produits de la base des données //
  async getAllProduct() {
    const product = await (await db.query(`SELECT p.* FROM projetWeb.products p`)).rows;
    return product;
  }

  // Permet de recuperer un produit à l'aide d'un id //
  async getOneProduct(id) {
    const product = await (
      await db.query(`SELECT p.* FROM projetWeb.products p WHERE p.id_product = $1`, [id])
    ).rows;
    return product[0];
  }

  // Permet de comptes combien de produits il y a //
  async countProduct() {
    const numberOfProduct = await (
      await db.query(`SELECT COUNT(p.*) FROM projetWeb.products p`)
    ).rows;
    return numberOfProduct[0].count;
  }

  // Permet d'ajouter un nouveau produit dans la base des données //
  async addProduct(body) {
    // insert into projetWeb.products (name,price,description,color,id_user,id_category) values ('Sac',65,'Sac à main en cuir','noir',1,2);
    await db.query(
      `INSERT INTO projetWeb.products (name,description,price,color) VALUES( $1, $2, $3, $4)`,
      [body.productName, body.description, body.price, body.color],
    );
    console.log(body.productName, body.description, body.price, body.color);
    const product = {
      productName: body.productName,
      description: body.description,
      price: body.price,
      color: body.color,
    };
    return product;
  }


    async countProductBySeller(body){
        const numberOfProduct = await (await db.query(`SELECT COUNT(*) FROM products  WHERE id_user = $1`,[body.id])).rows;
        return numberOfProduct[0].count;
    }

    async getAllProductBySeller(body){
        const product = await (await db.query(`SELECT * FROM products  WHERE id_user = $1`,[body.id])).rows;
        return product;
    }


   

  async listByType(type) {
    const product = await (await db.query(`SELECT * FROM products WHERE type = $1`, [type])).rows;
    return product;
  }
}
module.exports = { Product };
