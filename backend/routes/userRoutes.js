const express = require('express');
const { registerUser, login, addExamToUser, getReservedExams } = require('../controller/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.route('/:id/addExam').post(addExamToUser);
router.route('/:id/reservedExams').get(getReservedExams);


module.exports = router;
