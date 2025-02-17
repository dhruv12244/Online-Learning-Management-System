
const Submission = require('../models/Submission');
const User = require('../models/User');
const path = require('path');
const { Op } = require('sequelize');

exports.submitAssignment = async (req, res) => {
  const { user_id, assignment_id } = req.body;
  const file = req.file; 

  try {
    const submission = await Submission.create({
      user_id,
      assignment_id,
      file_path: file ? path.join('../uploads/', file.filename) : null,
    });

    return res.status(201).json({ message: 'Assignment submitted successfully!', submission });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    return res.status(500).json({ error: 'Failed to submit assignment.' });
  }
};

exports.getSubmission = async (req, res) => {
  const { assignment_id, user_id } = req.params;

  try {
    const submission = await Submission.findOne({
      where: { assignment_id, user_id },
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    return res.status(200).json({ submission });
  } catch (error) {
    console.error('Error fetching submission:', error);
    return res.status(500).json({ error: 'Failed to fetch submission.' });
  }
};

exports.gradeSubmission = async (req, res) => {
  const { submission_id } = req.params;  
  const { grade } = req.body;  

  try {
    const submission = await Submission.findByPk(submission_id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    submission.grade = grade;
    await submission.save();

    return res.status(200).json({ message: 'Grade submitted successfully' });
  } catch (error) {
    console.error('Error submitting grade:', error);
    return res.status(500).json({ error: 'Failed to submit grade' });
  }
};

exports.getSubmissionsForAssignment = async (req, res) => {
  const { assignment_id } = req.params;

  try {
    const submissions = await Submission.findAll({
      where: { assignment_id },
      include: [{ model: User, attributes: ['name'] }], 
    });

    if (submissions.length === 0) {
      return res.status(404).json({ error: 'No submissions found for this assignment.' });
    }

    return res.status(200).json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ error: 'Failed to fetch submissions.' });
  }
};
exports.getGradedSubmissions = async (req, res) => {
  const { user_id } = req.params;
  console.log('Fetching graded submissions for User ID:', user_id);

  try {
    const gradedSubmissions = await Submission.findAll({
      where: { user_id, grade: { [Op.ne]: null } },
      include: [
        {
          model: Assignment,
          attributes: ['title'], 
        },
      ],
    });

    if (!gradedSubmissions || gradedSubmissions.length === 0) {
      return res.status(404).json({ error: 'No graded submissions available.' });
    }

    return res.status(200).json({ grades: gradedSubmissions });
  } catch (error) {
    console.error('Error fetching graded submissions:', error);
    return res.status(500).json({ error: 'Failed to fetch graded submissions.' });
  }
};