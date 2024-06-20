const express = require('express');
const { createExam, getExamById, getAllExams, getApprovedExams, approveExam, deleteExam, getNotApprovedExams } = require('../controller/examAdminController');
const { getUserRole } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/approved')
    .get(getApprovedExams);

router.route('/notApproved')
    .get(getNotApprovedExams);

router.route('/')
    .post(createExam)
    .get(getAllExams);

router.route('/:id')
    .get(getExamById)
    .delete(deleteExam);

router.route('/:id/approve')
    .put(approveExam);

router.route('/user-role')
    .get(protect, getUserRole);

module.exports = router;
