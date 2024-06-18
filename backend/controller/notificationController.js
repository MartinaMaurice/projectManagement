const asyncHandler = require('express-async-handler');
const Notification = require('../models/notificationModel');

const createNotification = asyncHandler(async (req, res) => {
    const { title, message, time } = req.body;

    const notification = new Notification({
        title,
        message,
        time
    });

    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);
});

const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({});
    console.log(notifications)
    res.json({ notifications });
});

module.exports = { createNotification, getNotifications };
