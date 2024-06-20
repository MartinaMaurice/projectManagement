const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Notification = require('../models/notificationModel');

// Helper function to create notifications
const createNotification = async (title, message) => {
    const notification = new Notification({
        title, message, time: new Date().toLocaleTimeString(), // Set the current time only
    });
    await notification.save();
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const addExamToUser = asyncHandler(async (req, res) => {
    const { id, title, date, time, description, location } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
        // Check if the exam is already reserved
        if (user.exams.some(exam => exam.id === id)) {
            res.status(400).json({ message: 'Exam already reserved' });
            return;
        }
        const newExam = { id, title, date, time, description, location };
        user.exams.push(newExam);
        await user.save();
        await createNotification('Exam Reserved', `The exam "${title}" has been reserved by user "${user.name}".`);

        res.status(201).json(newExam);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const getReservedExams = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user.exams);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


const getUserRole = asyncHandler(async (req, res) => {
    const user = req.user;
    if (user) {
        res.json({ role: user.role });
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
});

module.exports = {
    registerUser,
    login,
    getUserRole,
    addExamToUser,
    getReservedExams,
};
