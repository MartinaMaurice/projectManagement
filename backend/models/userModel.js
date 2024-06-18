const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['trainee', 'trainingCenter', 'admin'],
            default: 'trainee',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('users', userSchema);
