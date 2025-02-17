
const express = require('express');
const router = express.Router();
const { submitAssignment, getSubmission, gradeSubmission, getSubmissionsForAssignment, getGradedSubmissions } = require('../controllers/submissionController');

router.post('/', submitAssignment);

router.get('/:assignment_id/:user_id', getSubmission);

router.post('/:submission_id/grade', gradeSubmission);

router.get('/:assignment_id', getSubmissionsForAssignment);

router.get('/graded/:user_id', getGradedSubmissions);
module.exports = router;