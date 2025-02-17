import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; 

const StudentHome = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);  
  const [loading, setLoading] = useState(true);  

  const staticAnnouncements = [
    {
      id: 1,
      title: "Grading Deadline",
      content: "Grading for all assignments must be completed by the end of this month.",
    },
    {
      id: 2,
      title: "New Course Material",
      content: "New course material has been uploaded for Machine Learning.",
    },
  ];

  const username = localStorage.getItem('username') || 'Student';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesRes = await axiosInstance.get('/courses');  
        console.log('Courses fetched:', coursesRes.data.courses); 
        setCourses(coursesRes.data.courses);  
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Welcome Back, {username}!
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Your Courses
        </Typography>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} key={course.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{course.name}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/coursedetails/${course.id}`)}
                    >
                      View Course
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Announcements
          </Typography>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <List>
                {staticAnnouncements.map((announcement) => (
                  <ListItem key={announcement.id} divider>
                    <ListItemText
                      primary={announcement.title}
                      secondary={announcement.content}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentHome;