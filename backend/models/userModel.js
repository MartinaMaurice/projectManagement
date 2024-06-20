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
        exams: [
            {
                title: { type: String, required: true },
                date: { type: Date, required: true },
                time: { type: String, required: true },
                description: { type: String, required: true },
                location: { type: String, required: true },
            }
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('users', userSchema);
