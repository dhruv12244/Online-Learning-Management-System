import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; 

const SubmissionPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axiosInstance.get('/assignments');
        setAssignments(response.data.assignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setError('Failed to load assignments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Submit Your Assignments
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Grid container spacing={3}>
          {assignments.map((assignment) => (
            <Grid item xs={12} key={assignment.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{assignment.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {assignment.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Due Date: {assignment.due_date}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/submitfile/${assignment.id}`)}
                    >
                      Submit File
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SubmissionPage;