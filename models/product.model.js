const mongoose = require('mongoose');

const productModel = mongoose.model('product', {
    name: {type: String, unique: true},
    price: String,
    inStock: Boolean,
    lastUpdated: {type: Date, default: Date.now()}
});

module.exports = productModel;