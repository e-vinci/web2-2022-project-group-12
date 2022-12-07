/* eslint-disable class-methods-use-this */
const db = require('../db/db');

class Product{

    async getAllProduct(){
        const product = await (await db.query(`SELECT * FROM products `)).rows;
        return product;
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
        await db.query(`INSERT INTO products (productname,type,prix) VALUES( $1, $2, $3 )`,[body.productName,body.type,body.prix]);
        console.log(body.productName,body.type,body.prix);
        const product = {
            productName: body.productName,
            type: body.type,
            prix: body.prix,
            
        };
        return product;
    };

   

}
module.exports = {Product};

