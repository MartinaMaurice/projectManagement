const asyncHandler = require('express-async-handler');
const Exam = require('../models/examModel');

// @desc    Create a new exam
// @route   POST /api/exams
// @access  Public
const createExam = asyncHandler(async (req, res) => {
    const { title, date, time, description, location } = req.body;

    const exam = new Exam({
        title,
        date,
        time,
        description,
        location
    });

    const createdExam = await exam.save();
    res.status(201).json(createdExam);
});

// @desc    Get exam by ID
// @route   GET /api/exams/:id
// @access  Public
const getExamById = asyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id);

    if (exam) {
        res.json(exam);
    } else {
        res.status(404).json({ message: 'Exam not found' });
    }
});

// @desc    Get all exams
// @route   GET /api/exams
// @access  Public
const getAllExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find({});
    res.json(exams);
});

module.exports = { createExam, getExamById, getAllExams };
