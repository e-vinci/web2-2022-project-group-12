const express = require('express');

const router = express.Router();
const { Product } = require('../models/product');

const productModel = new Product();


// Permet de lister tous les produits de la db 
router.get('/getAll', async(req,res)=>{
    const result = await productModel.getAllProduct();
    if(!result) res.sendStatus(404).end();
    res.send(result);
});

// Permet de récupérer un produit en particulier avec id
router.get('/getIdProduct/:id', async (req, res) => {
  const result = await productModel.getOneProduct(req.params.id);
  res.send(result);
});

// Compte tous les produits dans la db
router.get('/countAll', async (req, res) => {
  const count = await productModel.countProduct();
  res.send(count);
});

// Ajoute le produit à la db
router.post('/add', async (req, res) => {
  console.log("la sa passe")
  console.log(req.body);
  const idProduct = await productModel.addProduct(req.body);
  return res.json(idProduct);
});

// Compte tous les produits dans la db
router.get('/search/:key', async (req, res) => {
  console.log('Search est ', req.params.key);
  const results = await productModel.Search(req.params.key);
  res.send(results);
});

// Permet de lister tous les produits de la db par vendeur
router.post('/getAllBySeller', async(req,res)=>{
    console.log("je suis passee")
    const result = await productModel.getAllProductBySeller(req.body);
    if(!result) res.sendStatus(404).end();
    console.log(result);
    return res.json(result[0])
})


// Compte tous les produits d'un vendeur dans la db
router.post('/countAllBySeller' , async(req,res)=>{
    console.log("enter in products.js")
    const count = await productModel.countProductBySeller(req.body);
    console.log("je passe",count)
    return res.json(count)
})



module.exports = router;
