const mongoose = require('mongoose');

const productModel = mongoose.model('product', {
    name: {type: String, unique: true},
    price: String,
    inStock: Boolean,
    image: {type: String},
    lastUpdated: {type: Date, default: Date.now()}
});

module.exports = productModel;