const express = require('express');

const router = express.Router();

const {User} = require("../models/user")
const userModel = new User();


/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

// inscription
router.post('/register', async function(req,res,next){
  console.log(req.body)
  const user = await userModel.addUser(req.body);
  return res.json(user);
})

module.exports = router;
