const mongoose = require('mongoose');

const reviewModel = mongoose.model('review', {
    subject: String,
    message: String,
    rating: Number,
    productID: String,
    lastUpdated: {type: Date, default: Date.now()}
});

module.exports = reviewModel;