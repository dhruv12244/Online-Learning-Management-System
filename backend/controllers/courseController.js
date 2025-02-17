
const Course = require('../models/Course'); 

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    return res.status(200).json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ error: 'Failed to fetch courses.' });
  }
};

exports.createCourse = async (req, res) => {
  const {
    name,
    description,
    start_date,
    end_date,
    category,
    enrollment_deadline,
    status,
    credits,
    student_count,
  } = req.body;

  try {
    console.log('Received course data:', req.body);

    if (!name || !description || !start_date || !end_date || !credits) {
      return res.status(400).json({ error: 'Please fill out all required fields.' });
    }

    if (isNaN(credits) || credits <= 0) {
      return res.status(400).json({ error: 'Credits must be a positive integer.' });
    }

    if (new Date(start_date) > new Date(end_date)) {
      return res.status(400).json({ error: 'Start date cannot be after end date.' });
    }

    const existingCourse = await Course.findOne({ where: { name } });
    if (existingCourse) {
      return res.status(400).json({ error: 'Course with this name already exists.' });
    }

    const newCourse = await Course.create({
      name,
      description,
      start_date,
      end_date,
      category: category || null,
      enrollment_deadline: enrollment_deadline || null,
      status: status || 'upcoming',
      credits,
      student_count,
    });

    return res.status(201).json({ message: 'Course created successfully!', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({ error: 'Failed to create course.' });
  }
};
exports.getCourseDetails = async (req, res) => {
  const { id } = req.params;
  
  try {
    const course = await Course.findByPk(id); 
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }
    res.status(200).json({ course });
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ error: 'Failed to fetch course details.' });
  }
};