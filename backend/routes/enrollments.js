
const express = require('express');
const router = express.Router();
const { enrollStudent, getStudentEnrollments } = require('../controllers/enrollmentController');

router.post('/', enrollStudent);

router.get('/:user_id', getStudentEnrollments);

module.exports = router;