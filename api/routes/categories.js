const express = require('express');

const router = express.Router();
const { Category } = require('../models/category');

const categoryModel = new Category();

// Compte tous les produits dans la db
router.get('/getAllCategories', async (req, res) => {
    const categories = await categoryModel.getAllCategories();
    res.send(categories);
  });

  // Compte tous les produits dans la db
router.get('/getCategory/:id', async (req, res) => {
  const categories = await categoryModel.getCategorie(req.params.id);
  res.send(categories);
});

module.exports = router;