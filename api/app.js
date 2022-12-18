const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
    origin: 'https://venoxam.github.io/',
};

const usersRouter = require('./routes/users');
const categoriesRouter = require ('./routes/categories')
const productsRouter = require ('./routes/products');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/users', cors(corsOptions), usersRouter );
app.use('/categories', cors(corsOptions), categoriesRouter);
app.use('/products',cors(corsOptions), productsRouter);
module.exports = app;
