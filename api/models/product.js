const db = require('../db/db');

class Product {
  async getAllProduct() {
    const product = await (await db.query(`SELECT * FROM products `)).rows;
    return product;
  }

  async countProduct() {
    const numberOfProduct = await (await db.query(`SELECT COUNT(*) FROM products`)).rows;
    console.log(' le nombre de produits est ', numberOfProduct[0].count);
    return numberOfProduct[0].count;
  }

  async addProduct(body) {
    await db.query(`INSERT INTO products (productname,type,prix) VALUES( $1, $2, $3 )`, [
      body.productName,
      body.type,
      body.prix,
    ]);
    console.log(body.productName, body.type, body.prix);
    const product = {
      productName: body.productName,
      type: body.type,
      prix: body.prix,
    };
    return product;
  }

  async listByType(type) {
    const product = await (await db.query(`SELECT * FROM products WHERE type = $1`, [type])).rows;
    return product;
  }
}
module.exports = { Product };
