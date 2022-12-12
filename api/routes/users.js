const express = require('express');
const { login } = require('../auths/auths');

const router = express.Router();

const {User} = require("../models/user");

const userModel = new User();


/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

// inscription
router.post('/register', async (req,res)=>{
  console.log(req.body)
  const user = await userModel.addUser(req.body);
  return res.json(user);
});

router.post('/login', async(req,res)=>{
  console.log(req.body);
  const {email} = req.body;
  const {password} = req.body;
  const user = await userModel.doIExist(email,password);

  if(user ===  null) return console.error("Le user n'existe pas");

  const emailUser = user.email;
  const logedInUser = await login(emailUser);
  return res.json(logedInUser);
});

// Permet de récupérer un produit en particulier avec id
router.get('/getIdStore/:id' , async(req,res)=>{
  const result = await userModel.getOneUser(req.params.id);
  res.send(result);
});


// Permet de récupérer un produit en particulier avec id
router.get('/getIdByEmail/:email' , async(req,res)=>{
  const result = await userModel.getOneUserByEmail(req.params.email);
  res.send(result);
});

module.exports = router;
