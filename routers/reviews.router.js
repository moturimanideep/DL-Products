const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviews.ctrl');

router.post('/add', reviewCtrl.addReview);

module.exports = router;