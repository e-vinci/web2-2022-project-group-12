const express = require('express');
const { login } = require('../auths/auths');

const router = express.Router();

const {User} = require("../models/User");

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
  if(user === null) return console.error("Le user n'existe pas");
  const emailUser = user.email;
  const logedInUser = await login(emailUser);
  
  return res.json(logedInUser);
});

module.exports = router;
