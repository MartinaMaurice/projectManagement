const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
