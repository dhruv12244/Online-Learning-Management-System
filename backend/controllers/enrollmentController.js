
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.enrollStudent = async (req, res) => {
  const { user_id, course_id } = req.body;  
  try {
    const existingEnrollment = await Enrollment.findOne({ where: { user_id, course_id } });
    if (existingEnrollment) {
      return res.status(400).json({ error: 'User is already enrolled in this course.' });
    }

    const enrollment = await Enrollment.create({ user_id, course_id });
    return res.status(201).json({ message: 'User enrolled successfully!', enrollment });
  } catch (error) {
    console.error('Error enrolling user:', error);
    return res.status(500).json({ error: 'Failed to enroll user.' });
  }
};

exports.getStudentEnrollments = async (req, res) => {
  const user_id = req.params.user_id; 

  try {
    const enrollments = await Enrollment.findAll({
      where: { user_id }, 
      include: [{ model: Course }] 
    });

    if (!enrollments.length) {
      return res.status(404).json({ message: 'No enrollments found for this user.' });
    }

    return res.status(200).json({ enrollments });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return res.status(500).json({ error: 'Failed to fetch enrollments.' });
  }
};