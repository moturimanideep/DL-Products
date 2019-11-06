const express = require('express');
const router = express.Router();
const defaultCtrl = require('../controllers/default.ctrl');

router.get('/', defaultCtrl.defaultCheck);
router.get('/healthcheck', defaultCtrl.healthCheck);

module.exports = router;