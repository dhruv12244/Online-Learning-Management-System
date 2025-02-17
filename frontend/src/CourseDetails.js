import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './axiosInstance'; 
import { Container, Typography, CircularProgress, Box, Card, CardContent, Grid, Divider } from '@mui/material';

const CourseDetails = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axiosInstance.get(`/courses/${id}`);
        setCourse(response.data.course);
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      {course ? (
        <Box sx={{ mt: 4 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography component="h1" variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                {course.name}
              </Typography>
              
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Description:</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {course.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Enrolled Students:</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {course.student_count}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Credits:</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {course.credits}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Category:</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {course.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Start Date:</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {new Date(course.start_date).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">End Date:</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {new Date(course.end_date).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mt: 3, mb: 2 }} />
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 4 }}>
          Course not found.
        </Typography>
      )}
    </Container>
  );
};

export default CourseDetails;