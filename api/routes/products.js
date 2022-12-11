const express = require('express');

const router = express.Router();
const {Product} = require("../models/Product");

const productModel = new Product();


// Permet de lister tous les produits de la db 
router.get('/getAll', async(req,res)=>{
    const result = await productModel.getAllProduct();
    if(!result) res.sendStatus(404).end();
    console.log(result);
    res.send(result);
})

// Compte tous les produits dans la db
router.get('/countAll' , async(req,res)=>{
    const count = await productModel.countProduct();
    if(!count) console.log("ca fnctionne aps");
    res.send(count);
})

// Ajoute le produit à la db
router.post('/add' , async(req,res)=>{
    console.log(req.body);
    const product = await productModel.addProduct(req.body);
    return res.json(product);
})



module.exports = router;