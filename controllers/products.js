const mongoose = require('mongoose');
require('../models/db');
const schema = mongoose.Schema;
const Product = require('../models/productModel');
const Variant = require('../models/variantModel');
module.exports =  {

    /*
        API : product list 
        Request Type : Post
        parameters : 
        {"search":"",	
	                "color":["white","black"],
	                "storage":["32GB","64GB"]
        }
        optional: all 
    */  

    productList: (req,res)=>{
        
        let condition = {};
        if(req.body.color != null){
            
            condition.$and = [
                
                {$in: ["$$item.color", req.body.color]}
            ];
        }
        if(req.body.storage != null){
            if(req.body.color != null){
                condition.$and.push({$in: ["$$item.storage", req.body.storage]});
            } else {
                condition.$and = [
                
                    {$in: ["$$item.storage", req.body.storage]}
                ];
            }
            
            
        }
        Product.aggregate([
            req.body.search!='' && req.body.search!=null?
            {$match: { 
                 $text:{ $search:req.body.search,$caseSensitive: false}
                 
                } 
            }:{$match:{}},
            {
                "$lookup": {
                    "from": "variants",
                    "localField": "_id",
                    "foreignField": "product_id",
                    "as": "variants"
                }
            },
            {
                $project: {
                  name: 1,
                  description: 1,
                  imgs : 1,
                  attributes : 1,
                  price:1,
                  discounted_price : 1,
                  has_variant:1,
                  variants: {
                    $filter: {
                      input: "$variants",
                      as: "item",
                      cond: condition
                    }
                  }
                }
            }
        ]).exec()
        .then((products)=>{
            res.json({'status':true,'data':products});

        }).catch((err)=>{
            res.json({'status':false,'data':err});
        });
            
        
    },
    /*End of Product List */

    /*
        API : Get Product By :id,
        Request Type = Get
        query params : ?id=id=5e085ec6381df6f254f1c846&has_variant=false
        send has_variant = true if products have variant otherwise send false,
        in the case of true send variant_id otherwise send product id
    */
    productDetail: (req,res)=>{
        let has_no_variant_condition = {};
        
        let has_variant = req.query.has_variant == 'true'?true:false;
        if(has_variant){
            
            has_no_variant_condition = {has_variant:has_variant};
            console.log(has_no_variant_condition);
            Product.aggregate([
                {
                    $match:has_no_variant_condition
                },
                {
                    "$lookup": {
                        "from": "variants",
                        "localField": "_id",
                        "foreignField": "product_id",
                        "as": "variants"
                    }
                },
                {
                    $unwind: '$variants'
                }, {
                    $match: {'variants._id': {$eq: mongoose.Types.ObjectId(req.query.id)}}
                },
                {
                    $project: {
                      name: 1,
                      description: 1,
                      imgs : 1,
                      attributes : 1,
                      price:1,
                      discounted_price : 1,
                      has_variant:1,
                      variants:1
                    
                    }
                }
            ]).exec()
            .then( (products)=>{
                console.log(products)
                if(products.length > 0){
                    let color = products[0].variants.color != null?products[0].variants['color']:"";
                    let storage = products[0].variants.storage != null ?products[0].variants['storage']:"";
                    let condition = {};
                    console.log(color);
                    if(color != ''){
                        
                        condition.$or = [
                            
                            {$in: ["$$item.color", [color]]}
                        ];
                    }
                    if(storage != ''){
                        if(color != ''){
                            condition.$or.push({$in: ["$$item.storage", [storage]]});
                        } else {
                            condition.$and = [
                            
                                {$in: ["$$item.storage", [storage]]}
                            ];
                        }
                        
                        
                    }
                    console.log(condition);
                    Product.aggregate([
                        {$match: { 
                            $text:{ $search:products[0].name,$caseSensitive: false}     
                            },
                            //has_no_variant_condition 
                        },
                        {
                            "$lookup": {
                                "from": "variants",
                                "localField": "_id",
                                "foreignField": "product_id",
                                "as": "variants"
                            }
                        },
                        {
                            $project: {
                            name: 1,
                            description: 1,
                            imgs : 1,
                            attributes : 1,
                            price:1,
                            discounted_price : 1,
                            has_variant:1,
                            variants: {
                                $filter: {
                                input: "$variants",
                                as: "item",
                                cond: condition
                                }
                            }
                            }
                        }
                    ]).exec()
                    .then((suggestion)=>{
                        res.json({'status':true,'data':products[0],'suggestion':suggestion});
                    }).catch((err)=>{
                        res.json({'status':true,'data':products[0],'suggestion':[]});
                    });
                
                } else {
                    console.log("fsfs");
                    res.json({'status':true,'data':products,'suggestion':[]});
                }
            }).catch((err)=>{
                console.log(err);
                res.json({'status':false,'data':err});
            });    
            
        } else {
            
            let condition = {};
            has_no_variant_condition = {_id : mongoose.Types.ObjectId(req.query.id),has_variant:has_variant};
            Product.aggregate([
                {
                    $match:has_no_variant_condition
                },
                {
                    "$lookup": {
                        "from": "variants",
                        "localField": "_id",
                        "foreignField": "product_id",
                        "as": "variants"
                    }
                },
                {
                    $project: {
                      name: 1,
                      description: 1,
                      imgs : 1,
                      attributes : 1,
                      price:1,
                      discounted_price : 1,
                      has_variant:1,
                      variants:1
                    
                    }
                }
            ]).exec()
            .then( (products)=>{
                console.log(products);
                if(products.length > 0){
                    console.log(products[0].name);
                    Product.aggregate([
                        {$match: { 
                            $text:{ $search:products[0].name,$caseSensitive: false},
                                 
                            } 
                        },
                        {
                            "$lookup": {
                                "from": "variants",
                                "localField": "_id",
                                "foreignField": "product_id",
                                "as": "variants"
                            }
                        },
                        {
                            $project: {
                            name: 1,
                            description: 1,
                            imgs : 1,
                            attributes : 1,
                            price:1,
                            discounted_price : 1,
                            has_variant:1,
                            variants: {
                                $filter: {
                                input: "$variants",
                                as: "item",
                                cond: condition
                                }
                            }
                            }
                        }
                    ]).exec()
                    .then((suggestion)=>{
                        
                        res.json({'status':true,'data':products[0],'suggestion':suggestion});
                    }).catch((err)=>{
                        console.log(err);
                        res.json({'status':true,'data':products[0],'suggestion':[]});
                    });
                } else {
                    res.json({'status':true,'data':products,'suggestion':[]});
                }
            }).catch((err)=>{
                res.json({'status':false,'data':err});
            });
            
        }
        
        
        
    }

}

