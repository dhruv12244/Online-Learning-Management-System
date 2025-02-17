
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';
import axiosInstance from './axiosInstance'; 
const Enrollment = () => {
  const [courses, setCourses] = useState([]); 
  const [selectedCourseId, setSelectedCourseId] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [enrollLoading, setEnrollLoading] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(''); 

  const user_id = localStorage.getItem('user_id'); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/courses');
        setCourses(response.data.courses);
        if (response.data.courses.length > 0) {
          setSelectedCourseId(response.data.courses[0].id); 
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  };

  const handleEnroll = async () => {
    setEnrollLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/enrollments', { user_id, course_id: selectedCourseId });
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setError('Enrollment failed. Please try again.');
    } finally {
      setEnrollLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Enroll in a Course
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Course</InputLabel>
          <Select value={selectedCourseId} onChange={handleCourseChange}>
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleEnroll}
          disabled={enrollLoading}
        >
          {enrollLoading ? <CircularProgress size={24} /> : 'Enroll'}
        </Button>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Successfully enrolled in the course!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Enrollment;