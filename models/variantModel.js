const mongoose = require('mongoose');
require('./db');
const Schema = mongoose.Schema;
const Product = ('./models/productModel');
//mongoose.connect('mongodb://localhost/iPhone_store',{ useNewUrlParser: true,useUnifiedTopology:true });

const variantSchema = new Schema({
    _id: Schema.Types.ObjectId,
    product_id : mongoose.Schema.Types.ObjectId,
    color : String,
    storage: String,
    price:String,
    discounted_price:String,
    imgs:[],
    description : String
});

let Variant = mongoose.model('Variant',variantSchema,'variants');

module.exports = Variant;