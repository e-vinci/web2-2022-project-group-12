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
  console.log(req.body);
  const product = await productModel.addProduct(req.body);
  return res.json(product);
});

router.get('/productsBySeller', async (req, res) => {
  const products = await productModel.getProductsBySeller(req.params.idSeller);
  return res.json(products);
});

module.exports = router;
