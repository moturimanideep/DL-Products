const reviewModal = require('../models/review.model');

const ReviewService = {
    save: function(data){
        let review = new reviewModal(data);
        return review.save();
    },
    getReviews(id){
        return reviewModal.find({productID: id}, {productID: 0, _id: 0, __v:0, lastUpdated: 0}).exec();
    }
}

module.exports = ReviewService;