const express = require('express');
const { createExam, getExamById, getAllExams } = require('../controller/examController');
const { getUserRole } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .post(createExam)
    .get(getAllExams);

router.route('/:id')
    .get(getExamById);

router.route('/user-role')
    .get(protect, getUserRole);

module.exports = router;
