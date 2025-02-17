import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import axiosInstance from './axiosInstance'; 

const SubmitFile = () => {
  const { assignmentId } = useParams(); 
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = async (event) => {
    const userId = localStorage.getItem('user_id');
    event.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);
    formData.append('assignmentId', assignmentId);

    setSuccess(true);

    try {
      setLoading(true);
      setError('');
      await axiosInstance.post(`/assignments/${assignmentId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error submitting file:', error);
      setError('File submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Submit File for Assignment {assignmentId}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleFileSubmit}>
          <TextField
            type="file"
            fullWidth
            onChange={handleFileChange}
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Upload File'}
            </Button>
          </Box>
        </form>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            File submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default SubmitFile;