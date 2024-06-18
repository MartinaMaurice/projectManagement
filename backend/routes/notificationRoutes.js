const express = require('express');
const { createNotification, getNotifications } = require('../controller/notificationController');
const router = express.Router();

router.route('/')
    .post(createNotification)
    .get(getNotifications);

module.exports = router;
