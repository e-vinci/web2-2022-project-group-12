/* eslint-disable class-methods-use-this */
const db = require('../db/db');

class Category {
  // Permet d'ajouter un nouvelle categorie dans la base des données //
  async addCategory(data) {
    const category = await db.query(`INSERT INTO projetWeb.categories (name) VALUES($1, $2)`, [
      data.name,
      data.sup,
    ]);
    return category;
  }

  // Permet de recuperer toutes les categories dans la base des données //
  async getAllCategories() {
    const categories = await (await db.query(`SELECT * FROM projetWeb.categories `)).rows;
    console.log(categories)
    return categories;
  }


  // Permet de compter le nombre de produits par catégorie
  async countProductByCategory(category){
      const countCategory = await (await db.query(`SELECT COUNT(*) FROM projetWeb.categories c WHERE c.name = $1`, [category])).rows;
      console.log("coucou c'est le nombre de categories" , countCategory);
      return countCategory;

  }

}
module.exports = { Category };
