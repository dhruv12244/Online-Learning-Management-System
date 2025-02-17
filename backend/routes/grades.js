
const express = require('express');
const router = express.Router();
const { assignGrade, getStudentGrades } = require('../controllers/gradeController');

router.post('/', assignGrade);

router.get('/:student_id', getStudentGrades);

module.exports = router;