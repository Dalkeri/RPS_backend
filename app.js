const express = require('express');
const bodyParser =  require('body-parser');

const baseRoutes = require('./routes/baseRoute');
require('dotenv').config();


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use(express.static('public'));  



app.use('/api/base', baseRoutes);


module.exports = app;