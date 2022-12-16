const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
    origin: 'https://venoxam.github.io/',
};

const usersRouter = require('./routes/users');
const pizzaRouter = require('./routes/pizzas');
const productsRouter = require ('./routes/products');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/users', usersRouter);
app.use('/pizzas', pizzaRouter);
app.use('/products',productsRouter);
module.exports = app;
