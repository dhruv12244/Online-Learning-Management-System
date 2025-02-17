// backend/index.js

// Import required modules
const sequelize = require('./config/db'); // Sequelize connection

// Import models
const Course = require('./models/Course');
const Assignment = require('./models/Assignment');
const Enrollment = require('./models/Enrollment');
const Submission = require('./models/Submission');

// Sync the models
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth'); // Import your auth routes
const courseRoutes = require('./routes/courses'); // Import course routes
const assignmentRoutes = require('./routes/assignments');
const enrollmentRoutes = require('./routes/enrollments');
const submissionRoutes = require('./routes/submissions');
const gradeRoutes = require('./routes/grades');

// Initialize the express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes); // Route for authentication
app.use('/api/courses', courseRoutes); // Route for courses
app.use('/api/assignments', assignmentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/grades', gradeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Backend API is running...');
});

// Test the database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database.');

    // Sync all models
    return sequelize.sync(); // Use { force: true } only if you want to drop and recreate tables
  })
  .then(() => {
    console.log('Database synced successfully.');

    // Start the server on port 5001
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const multer = require('multer');

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Use `upload.single('file')` in your routes where file uploading is required.