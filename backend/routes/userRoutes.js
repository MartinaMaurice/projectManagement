const express = require('express');
const { registerUser, login, addExamToUser, getReservedExams, getSuccessful } = require('../controller/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.route('/:id/addExam').post(addExamToUser);
router.route('/:id/reservedExams').get(getReservedExams);
router.route('/successful').get(getSuccessful);


module.exports = router;
