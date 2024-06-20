const asyncHandler = require('express-async-handler');
const Exam = require('../models/examAdminModel');

// @desc    Get metrics
// @route   GET /api/metrics
// @access  Public
const getMetrics = asyncHandler(async (req, res) => {
    const totalSlots = 100; // Default total slots
    const totalTrainingCenters = 20; // Default number of training centers

    // Calculate the total number of exams
    const totalExamSessions = await Exam.countDocuments({});

    // Calculate the upcoming exams within the next 2 days
    const upcomingDate = new Date();
    upcomingDate.setDate(upcomingDate.getDate() + 2);
    const upcomingExams = await Exam.countDocuments({ date: { $lte: upcomingDate, $gte: new Date() } });

    // Calculate available slots
    const availableSlots = totalSlots - totalExamSessions;

    const metrics = {
        totalExamSessions,
        availableSlots,
        numberOfTrainingCenters: totalTrainingCenters,
        upcomingExams
    };

    res.json(metrics);
});

module.exports = { getMetrics };
