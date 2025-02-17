
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; 
const CourseCreation = () => {
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [start_date, setStartDate] = useState(''); 
  const [end_date, setEndDate] = useState(''); 
  const [category, setCategory] = useState('');
  const [enrollment_deadline, setEnrollmentDeadline] = useState('');
  const [credits, setCredits] = useState(3); 
  const [student_count, setStudentCount] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCourseCreation = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !description || !start_date || !end_date || !category || !credits || student_count < 0) {
      setError('Please fill out all fields and ensure student count is valid.');
      setLoading(false);
      return;
    }

    if (credits <= 0) {
      setError('Credits must be a positive integer.');
      setLoading(false);
      return;
    }

    if (new Date(start_date) > new Date(end_date)) {
      setError('Start date cannot be after end date.');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/courses/create', {
        name,
        description,
        start_date,
        end_date,
        category,
        enrollment_deadline: enrollment_deadline || null,
        status: 'upcoming', 
        credits,
        student_count,
      });

      if (response.status === 201) {
        alert('Course created successfully!');
        navigate('/teacherhome'); 
      }
    } catch (error) {
      console.error('Error creating course:', error);
      setError(
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'Failed to create course. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Course
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleCourseCreation}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Course Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Course Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                variant="outlined"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                variant="outlined"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Enrollment Deadline"
                variant="outlined"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={enrollment_deadline}
                onChange={(e) => setEnrollmentDeadline(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Credits"
                variant="outlined"
                type="number"
                fullWidth
                value={credits}
                onChange={(e) => setCredits(parseInt(e.target.value) || 0)}
                required
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Student Count"
                variant="outlined"
                type="number"
                fullWidth
                value={student_count}
                onChange={(e) => setStudentCount(parseInt(e.target.value) || 0)}
                required
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Course'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CourseCreation;