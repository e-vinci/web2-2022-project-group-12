const express = require('express');

const router = express.Router();

const { User } = require('../models/user');

const userModel = new User();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

// Enregistrement d'un nouveau utilisateur dans la base des données
router.post('/register', async (req, res) => {
  console.log(req.body);
  const user = await userModel.addUser(req.body);
  return res.json(user);
});

// Routeur permettant de se connecter comme utilisateur //

router.post('/login', async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const user = await userModel.doIExist(email, password);

  if (user === null) return res.sendStatus(404);
  return res.json(user);
});

// Permet de récupérer un vendeur en particulier avec id
router.get('/getStore/:id', async (req, res) => {
  const result = await userModel.getStore(req.params.id);
  if (result === null) return null;
  return res.json(result);
});

// Permet de récupérer un vendeur en particulier avec un id qui pourrait etre seulment un user
// sert pour une verification dans userPage
router.get('/getIdStore/:id', async (req, res) => {
  console.log("je suis passé", req.params.id);
  const result = await userModel.getIdStore(req.params.id);
  console.log("rsult", result);
  return res.json(result);
});


// Permet de récupérer un produit en particulier avec id
router.get('/getIdByEmail' , async(req,res)=>{
  console.log(req.body)
  const result = await userModel.getOneUserByEmail(req.body);
  res.send(result);
});

// Permet au utilisateur de devenir vendeur//
router.post('/becomeSeller', async (req, res) => {
  const store = await userModel.beSeller(req.body);
  return res.json(store);
});

// Permet de recuperer tt les donnée d'un utilisateur //
/* router.post('/getUserDetails', async (req, res) => {
  console.log(getAuthenticatedUser().userId);
  const iduser = getAuthenticatedUser().userId;
  const userWithDetails = await userModel.getOneUser(iduser);
  return res.json(userWithDetails);
}); */

// Permet d'update les info d'un user
router.post('/updateUserFirstName', async (req, res) => {
  const result = await userModel.updateUserFirstName(req.body);
  return res.json(result);
});

// Permet d'update les info d'un user
router.post('/updateUserLastName', async (req, res) => {
  const result = await userModel.updateUserLastName(req.body);
  return res.json(result);
});

// Permet d'update les info d'un user
router.post('/updateUserEmail', async (req, res) => {
  const result = await userModel.updateUserEmail(req.body);
  return res.json(result);
});

// Permet d'update les info d'un user
router.post('/updateUserPassword', async (req, res) => {
  const result = await userModel.updateUserPassword(req.body);
  return res.json(result);
});

// Permet de récupérer un produit en particulier avec id
router.post('/getUserEmail' , async(req,res)=>{
  const result = await userModel.getUserEmail(req.body);
  return res.json(result);
});

router.post('/deleteAccount', async(req,res)=>{
  const result = await userModel.deleteUser(req.body.userId);
  return res.json(result);
});

module.exports = router;

