/* eslint-disable class-methods-use-this */
const db = require('../db/db');

class Product {
  // Permet de recuperer tous les produits de la base des données //
  async getAllProduct() {
    const product = await (
      await db.query(
        `SELECT DISTINCT p.id_product, p.name, p.price, c.name as "category", s.store_name, s.id_user, c.id_category FROM projetWeb.products p, projetWeb.categories c, projetWeb.users u, projetWeb.seller s WHERE u.id_user = s.id_user AND u.id_user = p.id_user AND c.id_category = p.id_category`,
      )
    ).rows;
    return product;
  }

  // Permet de recuperer un produit à l'aide d'un id //
  async getOneProduct(id) {
    const product = await (
      await db.query(
        `SELECT p.*, s.store_name, c.name as "category", c.id_category FROM projetWeb.products p, projetWeb.seller s, projetWeb.categories c WHERE p.id_product = $1 AND s.id_user = p.id_user AND c.id_category = p.id_category`,
        [id],
      )
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

    const idProduct = await db.query(
      `INSERT INTO projetWeb.products (name,description,price,color,id_user,id_category) VALUES( $1, $2, $3, $4, $5, $6) RETURNING id_product`,
      [body.productname, body.description, body.price, body.color, body.idUser, body.idCategory],
    );
    const productId = idProduct.rows[0].id_product;
    return productId;
  }

  // compte les produits d'un vendeur
  async countProductBySeller(body) {
    const numberOfProduct = await (
      await db.query(`SELECT COUNT(*) FROM projetWeb.products  WHERE id_user = $1`, [body.id])
    ).rows;
    return numberOfProduct[0].count;
  }

  // Recupere tous les produit d'un vendeur en particulier 
  async getAllProductBySeller(idSeller) {
    const product = await (
      await db.query(
        `SELECT DISTINCT p.*, c.name as "category", c.id_category FROM projetWeb.products p, projetWeb.categories c WHERE p.id_category = c.id_category AND id_user = $1`,
        [idSeller],
      )
    ).rows;
    return product;
  }

  // Recupere tous les produits de la meme categorie
  async listByCategory(categoryID) {
    const product = await (
      await db.query(
        `SELECT DISTINCT p.id_product, p.name, p.price, c.name as "category", c.id_category, s.store_name, s.id_user FROM projetWeb.products p, projetWeb.categories c, projetWeb.users u, projetWeb.seller s  WHERE u.id_user = s.id_user AND u.id_user = p.id_user AND c.id_category = p.id_category AND c.id_category = $1`,
        [categoryID],
      )
    ).rows;
    return product;
  }

  // Permet de trouver un produit dans la db graçe au formulaire de recherche //
  async Search(data) {
    if (data === undefined || data === '' || data === null) {
      return undefined;
    }
    const concatenation = `%${data}%`;
    const result = await (
      await db.query(
        `SELECT DISTINCT p.id_product, p.name, p.price, c.name as "category", c.id_category, s.store_name, s.id_user FROM projetWeb.products p, projetWeb.categories c, projetWeb.users u, projetWeb.seller s WHERE (p.name LIKE $1 OR p.description LIKE $1 OR c.name LIKE $1 OR u.first_name LIKE $1 OR u.last_name LIKE $1 OR s.store_name LIKE $1) AND u.id_user = s.id_user AND u.id_user = p.id_user AND c.id_category = p.id_category`,
        [concatenation],
      )
    ).rows;
    return result;
  }

  // Permet d'ajouter un une review dans la db pour un produit, en entrant aussi l'id du user //
  async addReview(data) {
    const review = await db.query(
      `INSERT INTO projetWeb.product_reviews (message,id_user,id_product) VALUES($1,$2,$3) RETURNING id_review`,
      [data.message, data.idUser, data.idProduct],
    );
    const idReview = review.rows[0].id_review;
    return idReview;
  }

  // Permet d'ajouter un une reponse à une review dans la db, en entrant aussi l'id du user //
  async addAnswer(data) {
    const review = await db.query(
      `INSERT INTO projetWeb.reviews_answers (message,id_user,id_review) VALUES($1,$2,$3) RETURNING id_answer`,
      [data.message, data.id_user, data.id_review],
    );
    const idAnswer = review.rows[0].id_answer;
    return idAnswer;
  }
}
module.exports = { Product };
