/* eslint-disable class-methods-use-this */
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

    async getOneProduct(id){
        const product = await (await db.query(`SELECT * FROM products WHERE id_product = $1`, [id])).rows;
        return product[0];
    }

    
    async countProduct(){
        const numberOfProduct = await (await db.query(`SELECT COUNT(*) FROM products`)).rows;
        return numberOfProduct[0].count;
    }

    async addProduct (body){
        await db.query(`INSERT INTO products (productname,description,type,price,color) VALUES( $1, $2, $3, $4, $5)`,[body.productName,body.description,body.type,body.prix,body.color]);
        console.log(body.productName,body.description,body.type,body.price,body.color);
        const product = {
            productName: body.productName,
            description: body.description,
            type: body.type,
            price: body.price,
            color: body.color,
        };
        return product;
    };
    return product;
  }

  async listByType(type) {
    const product = await (await db.query(`SELECT * FROM products WHERE type = $1`, [type])).rows;
    return product;
  }
}
module.exports = { Product };
