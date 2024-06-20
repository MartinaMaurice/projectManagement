const asyncHandler = require('express-async-handler');
const ExamAdmin = require('../models/examAdminModel');
const Notification = require('../models/notificationModel');

// Helper function to create notifications
const createNotification = async (title, message) => {
    const notification = new Notification({
        title, message, time: new Date().toLocaleTimeString(),
    });
    await notification.save();
};

// @desc    Create a new exam
// @route   POST /api/examsAdmin
// @access  Public
const createExam = asyncHandler(async (req, res) => {
    const { title, date, time, description, location } = req.body;

    const exam = new ExamAdmin({
        title,
        date,
        time,
        description,
        location,
        approved: false, // Default value
    });

    const createdExam = await exam.save();
    await createNotification('New Exam Created', `A new exam "${title}" has been created and is awaiting approval.`);

    res.status(201).json(createdExam);
});

// @desc    Get exam by ID
// @route   GET /api/examsAdmin/:id
// @access  Public
const getExamById = asyncHandler(async (req, res) => {
    const exam = await ExamAdmin.findById(req.params.id);

    if (exam) {
        res.json(exam);
    } else {
        res.status(404).json({ message: 'Exam not found' });
    }
});

// @desc    Get all exams
// @route   GET /api/examsAdmin
// @access  Public
const getAllExams = asyncHandler(async (req, res) => {
    const exams = await ExamAdmin.find({});
    res.json(exams);
});

// @desc    Get all approved exams
// @route   GET /api/examsAdmin/approved
// @access  Public
const getApprovedExams = asyncHandler(async (req, res) => {
    const exams = await ExamAdmin.find({ approved: true });
    res.json(exams);
});
const getNotApprovedExams = asyncHandler(async (req, res) => {
    const exams = await ExamAdmin.find({ approved: false });
    res.json(exams);
});
// @desc    Approve an exam
// @route   PUT /api/examsAdmin/:id/approve
// @access  Public
const approveExam = asyncHandler(async (req, res) => {
    const exam = await ExamAdmin.findById(req.params.id);

    if (exam) {
        exam.approved = true;
        const updatedExam = await exam.save();
        await createNotification('Exam Approved', `The exam "${exam.title}" has been approved.`);
        res.json(updatedExam);
    } else {
        res.status(404).json({ message: 'Exam not found' });
    }
});

// @desc    Delete an exam
// @route   DELETE /api/examsAdmin/:id
// @access  Public
const deleteExam = asyncHandler(async (req, res) => {
    const exam = await ExamAdmin.findById(req.params.id);

    if (exam) {
        await exam.remove();
        res.json({ message: 'Exam removed' });
    } else {
        res.status(404).json({ message: 'Exam not found' });
    }
});

module.exports = { createExam, getExamById, getAllExams, getApprovedExams, approveExam, deleteExam, getNotApprovedExams };
