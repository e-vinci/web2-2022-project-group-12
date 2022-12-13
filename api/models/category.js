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
    const categories = await (await db.query(`SELECT c.name FROM projetWeb.categories c`)).rows;
    return categories;
  }

}
module.exports = { Category };
