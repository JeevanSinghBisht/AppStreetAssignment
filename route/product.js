const express  = require('express');
const router = express.Router();
const productController = require('../controllers/products');



router.post('/list',(req,res)=>{
    
    productController.productList(req,res);
});

router.get('/productDetail',(req,res)=>{
    productController.productDetail(req,res);
});

module.exports = router;