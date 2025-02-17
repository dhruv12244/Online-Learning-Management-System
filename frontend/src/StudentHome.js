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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

const StudentHome = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]); 
  const userId = localStorage.getItem('user_id');

  const staticAnnouncements = [
    { id: 1, title: "Faculty Meeting", content: "Faculty meeting will be held on Friday at 2:00 PM in the conference hall." },
    { id: 2, title: "Grading Deadline", content: "Grading for all assignments must be completed by the end of this month." },
    { id: 3, title: "New Course Material", content: "New course material has been uploaded for Machine Learning." },
  ];

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const coursesRes = await axiosInstance.get(`/enrollments/${userId}`);
        const assignmentsRes = await axiosInstance.get('/assignments');

        if (coursesRes.data.enrollments.length > 0) {
          const fetchedCourses = coursesRes.data.enrollments
            .map((enrollment) => enrollment.Course)
            .filter((course) => course);
          setCourses(fetchedCourses);
          setSelectedCourseId(fetchedCourses[0]?.id || '');
        }
        setAssignments(assignmentsRes.data.assignments);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [userId]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const gradesRes = await axiosInstance.get(`/submissions/graded/${userId}`);
        console.log("Fetched Grades Data:", gradesRes.data); 
        setGrades(gradesRes.data.grades); 
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [userId]);

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const filteredAssignments = assignments.filter(
    (assignment) => assignment.course_id === selectedCourseId
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Welcome Back, Student!
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Current Courses
        </Typography>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} key={course.id}>
              <Card>
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
            Upcoming Assignments
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Course</InputLabel>
            <Select
              value={selectedCourseId}
              onChange={handleCourseChange}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <List>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment) => (
                <ListItem key={assignment.id} divider>
                  <ListItemText
                    primary={`${assignment.title}`}
                    secondary={`Due: ${assignment.due_date}`}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/submission')}
                  >
                    Submit
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography>No assignments for this course.</Typography>
            )}
          </List>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Recent Grades
          </Typography>
          <Card>
            <CardContent>
              <List>
                {grades && grades.length > 0 ? (
                  grades.map((grade) => (
                    <ListItem key={grade.id} divider>
                      <ListItemText
                        primary={`Assignment ID: ${grade.assignment_id}`}
                        secondary={`Grade: ${grade.grade}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography>No grades available yet.</Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Announcements
          </Typography>
          <Card>
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