import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import axiosInstance from './axiosInstance'; 

const GradeSubmission = () => {
  const { submissionId } = useParams(); 
  const [grade, setGrade] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(false); 

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error('Error fetching submission:', error);
        setError('Failed to load submission.');
      }
    };

    fetchSubmissionDetails();
  }, [submissionId]);

  const handleGradeSubmit = async () => {
    if (!grade) {
      setError('Please select a grade.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const response = await axiosInstance.post(`/submissions/${submissionId}/grade`, { grade });

      if (response.status === 200) {
        setSuccess(true); 
      }
    } catch (error) {
      console.error('Error grading submission:', error);
      setError('Failed to submit grade.');
    } finally {
      setLoading(false);
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
          Grade Submission {submissionId}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Grade (out of 10)</InputLabel>
          <Select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            label="Grade (out of 10)"
          >
            {[...Array(11).keys()].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleGradeSubmit}
          disabled={loading}
        >
          Submit Grade
        </Button>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Grade submitted successfully!
          </Alert>
        </Snackbar>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          Frequently Asked Questions
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="How do I submit a grade?"
              secondary="To submit a grade, select a grade from the dropdown and click the 'Submit Grade' button."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Can I change the grade later?"
              secondary="Yes, you can revisit this page and submit a new grade if needed."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="What if a submission is missing?"
              secondary="If a submission is missing, ensure that the student has submitted their work. If not, reach out to them."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default GradeSubmission;