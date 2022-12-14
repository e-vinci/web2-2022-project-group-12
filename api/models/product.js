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
      await db.query(
        `SELECT p.*, s.store_name, c.name as "category" FROM projetWeb.products p, projetWeb.seller s, projetWeb.categories c WHERE p.id_product = $1 AND s.id_user = p.id_user AND c.id_category = p.id_category`,
        [id],
      )
    ).rows;
    console.log("bakcend", product[0]);
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

    const idProduct = await db.query(`INSERT INTO projetWeb.products (name,description,price,color,id_user,id_category) VALUES( $1, $2, $3, $4, $5, $6) RETURNING id_product`,
      [body.productname, body.description, body.price, body.color, body.idUser, body.idCategory]
    );

    console.log("test add :",body.productname, body.description, body.price, body.color, body.idUser, body.idCategory);

    const productId =  idProduct.rows[0].id_product
    console.log("ceci cest le product id:",productId)
    return productId;
  }


    async countProductBySeller(body){
        console.log("enter in product.js")
        const numberOfProduct = await (await db.query(`SELECT COUNT(*) FROM projetWeb.products  WHERE id_user = $1`,[body.id])).rows;
        return numberOfProduct[0].count;
    }

    async getAllProductBySeller(idSeller){
        const product = await (await db.query(`SELECT * FROM projetWeb.products  WHERE id_user = $1`,[idSeller])).rows;
        return product;
    }


  async listByCategory(categoryID) {
    const product = await (
      await db.query(`SELECT p.* FROM projetWeb.products p WHERE p.id_category = $1`, [categoryID])
    ).rows;
    return product;
  }

  // Permet de trouver un produit dans la db graçe au formulaire de recherche //
  async Search(data) {
    console.log('model search ', data);

   const concatenation = `%${data}%`;
   console.log('model concatené search ', concatenation);
    const result = await (await db.query(`SELECT DISTINCT p.name, p.price, c.name, u.first_name FROM projetWeb.products p, projetWeb.categories c, projetWeb.users u WHERE ((p.name LIKE $1 OR p.description LIKE $1) OR c.name LIKE $1) AND u.id_user = p.id_user AND c.id_category = p.id_category`,[concatenation])).rows;
    
    // const result = await (await db.query(`SELECT p.* FROM projetWeb.products p WHERE p.name LIKE '% $1 %'`,[data])).rows;
    console.log('model search resultats ', result);
    return result;
  }
}
module.exports = { Product };
