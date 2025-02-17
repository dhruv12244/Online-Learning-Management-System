
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const Submission = require('../models/Submission');
const path = require('path');
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      include: {
        model: Course, 
        attributes: ['name'], 
      },
    });
    return res.status(200).json({ assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return res.status(500).json({ error: 'Failed to fetch assignments.' });
  }
};
exports.createAssignment = async (req, res) => {
  const { title, description, dueDate, courseId } = req.body;

  try {
    if (!title || !description || !dueDate || !courseId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newAssignment = await Assignment.create({
      title,
      description,
      due_date: dueDate,
      course_id: courseId,
    });

    return res.status(201).json({ message: 'Assignment created successfully!', assignment: newAssignment });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return res.status(500).json({ error: 'Failed to create assignment.' });
  }
};



exports.submitAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const userId = req.body.user_id;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.join('uploads', req.file.filename);

    const submission = await Submission.create({
      assignment_id: assignmentId,
      user_id: userId,
      file_path: filePath, 
    });

    return res.status(201).json({ message: 'File uploaded successfully', submission });
  } catch (error) {
    console.error('Error saving submission:', error);
    return res.status(500).json({ error: 'Failed to save submission' });
  }
};