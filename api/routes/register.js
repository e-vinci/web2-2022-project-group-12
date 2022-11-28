const express = require('express');
const db = require('../db/db');

const router = express.Router();

function addUser(body) {
    const req = 'INSERT INTO users (firstname, lastname, email, sex, password) VALUES ($1, $2, $3, $4, $5);';
    const data = [body.firstname,body.lastname,body.email,body.password]
    db.query(req,data);
};

export default addUser;
module.exports = router;