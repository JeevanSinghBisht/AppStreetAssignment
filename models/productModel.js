const mongoose = require('mongoose');
require('./db');
const Schema = mongoose.Schema;
const Variant = ('./models/variantModel');
mongoose.connect('mongodb://localhost/iPhone_store',{ useNewUrlParser: true,useUnifiedTopology:true });

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : String,
    description : String,
    imgs : [],
    attributes:[],
    price : String,
    discounted_price:String,
    has_variant:Boolean,
    variants : [{ type: Schema.Types.ObjectId, ref: 'Variant' }]
});

let Product = mongoose.model('Product',productSchema,'products');

module.exports = Product;