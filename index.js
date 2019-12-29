const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

const productsRoute = require('./route/product');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.use(express.static("public"));


app.use('/api/products',productsRoute);

app.use('/',(req,res)=>{
    res.json({'status':false,"data":"404 not found"});
});

app.listen(process.env.PORT,()=>{
    console.log(`running on ${process.env.PORT} port`);
});