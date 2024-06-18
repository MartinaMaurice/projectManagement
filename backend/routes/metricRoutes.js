const express = require('express');
const { getMetrics } = require('../controller/metricController');
const router = express.Router();

router.route('/')
    .get(getMetrics)

module.exports = router;
