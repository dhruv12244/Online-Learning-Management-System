import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from './axiosInstance'; 

const Grading = () => {
  const [assignments, setAssignments] = useState([]);  
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');  
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  
  const [success, setSuccess] = useState(false);  
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const assignmentsRes = await axiosInstance.get('/assignments');
        setAssignments(assignmentsRes.data.assignments);
        if (assignmentsRes.data.assignments.length > 0) {
          setSelectedAssignmentId(assignmentsRes.data.assignments[0].id); 
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  useEffect(() => {
    if (selectedAssignmentId) {
      const fetchSubmissions = async () => {
        setLoading(true);
        try {
          const submissionsRes = await axiosInstance.get(`/submissions/${selectedAssignmentId}`);
          setSubmissions(submissionsRes.data.submissions);
        } catch (error) {
          console.error('Error fetching submissions:', error);
          setError('Failed to load submissions.');
        } finally {
          setLoading(false);
        }
      };

      fetchSubmissions();
    }
  }, [selectedAssignmentId]);

  const handleAssignmentChange = (event) => {
    setSelectedAssignmentId(event.target.value);
  };

  const handleGrade = (submissionId) => {
    navigate(`/grade/${submissionId}`);  
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Grading Submissions
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Assignment</InputLabel>
          <Select
            value={selectedAssignmentId}
            onChange={handleAssignmentChange}
          >
            {assignments.map((assignment) => (
              <MenuItem key={assignment.id} value={assignment.id}>
                {assignment.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <List>
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <ListItem key={submission.id} divider>
                <ListItemText
                  primary={`Student: ${submission.User.name}`}
                  secondary={`Submitted At: ${new Date(submission.submitted_at).toLocaleString()}`}
                />
                {/* <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => {
                    window.open(`${process.env.REACT_APP_BACKEND_URL}/${submission.file_path}`, '_blank');
                    
                  }}
                >
                  View File
                </Button> */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => {
                  const fileUrl = `${process.env.REACT_APP_BACKEND_URL}/${submission.file_path}`;
    
                   // Create an invisible anchor element
                  const link = document.createElement('a');
                  link.href = fileUrl;
                  link.download = submission.file_path.split('/').pop();  // This sets the download filename (optional)
    
                  // Trigger the download by clicking the link programmatically
                  link.click();
                  }}
                  >
                 Download File
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleGrade(submission.id)} 
                >
                  Grade
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography>No submissions for this assignment.</Typography>
          )}
        </List>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Submission graded successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Grading;