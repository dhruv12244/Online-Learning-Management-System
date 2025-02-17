import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/auth/forgot-password', {
        name,
        email,
        role,
        newPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Password reset successful!');
        navigate('/'); 
      }
    } catch (error) {
      console.error('Password Reset Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Password reset failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        
        <Box component="form" onSubmit={handleForgotPassword} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;