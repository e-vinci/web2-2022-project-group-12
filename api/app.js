const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const categoriesRouter = require ('./routes/categories')
const productsRouter = require ('./routes/products');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/categories',categoriesRouter);
app.use('/products',productsRouter);
module.exports = app;
