/* eslint-disable class-methods-use-this */
const db = require('../db/db');

class Product{

    async getAllProduct(){
        const product = await (await db.query(`SELECT p.* FROM projetWeb.products p`)).rows;
        return product;
    }

    async getOneProduct(id){
        const product = await (await db.query(`SELECT p.* FROM projetWeb.products p WHERE p.id_product = $1`, [id])).rows;
        return product[0];
    }

    
    async countProduct(){
        const numberOfProduct = await (await db.query(`SELECT COUNT(p.*) FROM projetWeb.products p`)).rows;
        return numberOfProduct[0].count;
    }

    async addProduct (body){
        await db.query(`INSERT INTO projetWeb.products (name,description,price,color) VALUES( $1, $2, $3, $4)`,[body.productName,body.description,body.prix,body.color]);
        console.log(body.productName,body.description,body.price,body.color);
        const product = {
            productName: body.productName,
            description: body.description,
            price: body.price,
            color: body.color,
        };
        return product;
    };


    async countProductBySeller(idUser){
        const numberOfProduct = await (await db.query(`SELECT COUNT(*) FROM products  WHERE id_user = $1`,[idUser])).rows;
        return numberOfProduct[0].count;
    }

    async getAllProductBySeller(idUser){
        const product = await (await db.query(`SELECT * FROM products  WHERE id_user = $1`,[idUser])).rows;
        return product;
    }


   

}
module.exports = {Product};

