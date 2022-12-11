const {Pool} = require('pg')
require('dotenv').config();

// require('dotenv').config({ path: '../local.env'}); // ceci est pour la db locale à mishok

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl:{
        rejectUnauthorized: false
    }
})

pool.connect()
    .then( () => console.log("Connected Successfuly on pool"))
    .catch((e) => console.log(JSON.stringify(e)))

module.exports = {
    query: (text, params) => pool.query(text, params)
}