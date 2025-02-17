import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setRole }) => {
  const [role, setSelectedRole] = useState('student'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setSelectedRole(newRole);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
        role
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', role);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('username', response.data.username);

        setIsLoggedIn(true);
        setRole(role);

        if (role === 'student') {
          navigate('/studenthome');
        } else if (role === 'teacher') {
          navigate('/teacherhome');
        }
      }
    } catch (error) {
      console.error('Login Error:', error.response.data);
      alert(error.response.data.error || 'Login failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        
        <ToggleButtonGroup
          color="primary"
          value={role}
          exclusive
          onChange={handleRoleChange}
          sx={{ mt: 2, mb: 2 }}
        >
          <ToggleButton value="student">Student</ToggleButton>
          <ToggleButton value="teacher">Teacher</ToggleButton>
        </ToggleButtonGroup>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>

        <Typography variant="body2" align="center">
          <Link to="/forgot-password">Forgot Password?</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;