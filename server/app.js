const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');

const app = express();
dotenv.config({path: './config.env'}); //we don't have to write it over and over again

require('./db/connection');
// const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth')); // here we link router files 

const PORT = process.env.PORT;

const middleware = (req, res, next) => {
    console.log("Added middleware");
    next();
};

app.get('/about' ,middleware, (req, res) => {
    res.send(`Hello world, about us page`);
});

app.get('/contact' , (req, res) => {
    res.send(`Hello world, contact us page`);
});

app.get('/signin' , (req, res) => {
    res.send(`Hello world, login page`);
});

app.get('/signup' , (req, res) => {
    res.send(`Hello world, register page`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});