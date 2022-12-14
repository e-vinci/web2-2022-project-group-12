const express = require('express');

const router = express.Router();
const { Product } = require('../models/product');

const productModel = new Product();

// Permet de lister tous les produits de la db par vendeur
router.get('/getAllBySeller/:id', async(req,res)=>{
  const result = await productModel.getAllProductBySeller(req.params.id);
  if(!result) res.sendStatus(404).end();
  res.send(result);
})

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

// Va récupérer les 5 derniers produits ajouté
router.get('/selectLastProduct', async (req, res) => {
  const count = await productModel.selectLastProduct();
  res.send(count);
});

// Ajoute le produit à la db
router.post('/add', async (req, res) => {
  const idProduct = await productModel.addProduct(req.body);
  return res.json(idProduct);
});

// Le search d'un produit grace à un mot
router.get('/search/:key', async (req, res) => {
  const results = await productModel.Search(req.params.key);
  res.send(results);
});


// Compte tous les produits d'un vendeur dans la db
router.post('/countAllBySeller' , async(req,res)=>{
    const count = await productModel.countProductBySeller(req.body);
    return res.json(count)
})

// Permet de récupérer les produits d'une categorie en particulier avec id
router.get('/listByCategory/:id', async (req, res) => {
  const result = await productModel.listByCategory(req.params.id);
  res.send(result);
});

// Ajoute une review au produit
router.post('/addReview', async (req, res) => {
  const review = await productModel.addReview(req.body);
  return res.json(review);
});

// Ajoute une reponse à la review d'un produit
router.post('/addAnswer', async (req, res) => {
  const answer = await productModel.addAnswer(req.body);
  return res.json(answer);
});


module.exports = router;
