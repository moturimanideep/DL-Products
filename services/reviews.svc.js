const reviewModal = require('../models/review.model');

const ReviewService = {
    save: function(data){
        let review = new reviewModal(data);
        return review.save();
    },
}

module.exports = ReviewService;