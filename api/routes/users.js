const express = require('express');
const { login } = require('../auths/auths');

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
  console.log(req.body);
  const { email } = req.body;
  const { password } = req.body;
  const user = await userModel.doIExist(email, password);

  if (user === null) return console.error("Le user n'existe pas");

  const emailUser = user.email;
  const logedInUser = await login(emailUser);
  return res.json(logedInUser);
});

// Permet de récupérer un vendeur en particulier avec id
router.get('/getIdStore/:id', async (req, res) => {
  const result = await userModel.getSeller(req.params.id);
  res.send(result);
});

// Permet au utilisateur de devenir vendeur//
router.post('/becomeSeller', async (req, res) => {
  console.log(req.body);
  const store = await userModel.beSeller(req.body);
  return res.json(store);
});

module.exports = router;
