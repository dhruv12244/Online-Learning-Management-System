
const express = require('express');
const router = express.Router();
const { getAllCourses, createCourse, getCourseDetails } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.use(authMiddleware);

router.get('/', getAllCourses);

router.post('/create', createCourse);

router.get('/:id', getCourseDetails);

module.exports = router;