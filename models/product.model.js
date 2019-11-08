const mongoose = require('mongoose');

const productModel = mongoose.model('product', {
    name: String,
    price: String,
    inStock: Boolean,
    lastUpdated: {type: Date, default: Date.now()}
});

module.exports = productModel;