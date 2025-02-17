
const Grade = require('../models/Grade');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
exports.assignGrade = async (req, res) => {
  const { student_id, assignment_id, grade } = req.body;

  console.log("Assigning grade with data:", { student_id, assignment_id, grade });  

  try {
    const existingGrade = await Grade.findOne({ where: { student_id, assignment_id } });

    if (existingGrade) {
      return res.status(400).json({ error: 'Grade already assigned for this assignment.' });
    }

    const newGrade = await Grade.create({ student_id, assignment_id, grade });
    console.log('Grade created:', newGrade); 
    return res.status(201).json({ message: 'Grade assigned successfully!', grade: newGrade });
  } catch (error) {
    console.error('Error assigning grade:', error);
    return res.status(500).json({ error: 'Failed to assign grade.' });
  }
};

exports.getStudentGrades = async (req, res) => {
  const { student_id } = req.params;

  try {
    const grades = await Grade.findAll({
      where: { student_id },
      include: [Assignment]
    });

    return res.status(200).json({ grades });
  } catch (error) {
    console.error('Error fetching grades:', error);
    return res.status(500).json({ error: 'Failed to fetch grades.' });
  }
};