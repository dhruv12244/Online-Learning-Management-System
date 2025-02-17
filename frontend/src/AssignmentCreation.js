
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, CircularProgress, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; 
const AssignmentCreation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleAssignmentCreation = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!title || !description || !dueDate || !courseId) {
      setError('Please fill out all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/assignments/create', {
        title,
        description,
        dueDate,
        courseId,
      });

      if (response.status === 201) {
        alert('Assignment created successfully!');
        navigate('/teacherhome');
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      setError('Failed to create assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Assignment
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleAssignmentCreation}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Assignment Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Assignment Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Due Date"
                variant="outlined"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Select Course"
                variant="outlined"
                fullWidth
                select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Assignment'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AssignmentCreation;