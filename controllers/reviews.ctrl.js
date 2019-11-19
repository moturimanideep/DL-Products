const reviewSvc = require('../services/reviews.svc');

class ReviewCtrl {
    async addReview(req, res) {
        try {
            await reviewSvc.save(req.body);
            res.send('Inserted successfully');
            res.status(200);
        } catch (error) {
            res.send('failed add review');
            res.status(400);
        }
    }
}

module.exports = new ReviewCtrl();