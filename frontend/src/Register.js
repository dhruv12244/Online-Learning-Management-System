
// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [role, setSelectedRole] = useState('student'); 
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRoleChange = (event, newRole) => {
//     if (newRole !== null) {
//       setSelectedRole(newRole);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirmPassword) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5001/api/auth/register', {
//         name,
//         email,
//         password,
//         role,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 201) {
//         alert('Registration successful! Please log in.');
//         navigate('/login');
//       }
//     } catch (error) {
//       console.error('Registration Error:', error.response.data);
//       alert(error.response.data.error || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography component="h1" variant="h5">
//           Register
//         </Typography>

//         <ToggleButtonGroup
//           color="primary"
//           value={role}
//           exclusive
//           onChange={handleRoleChange}
//           sx={{ mt: 2, mb: 2 }}
//         >
//           <ToggleButton value="student">Student</ToggleButton>
//           <ToggleButton value="teacher">Teacher</ToggleButton>
//         </ToggleButtonGroup>

//         <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Full Name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Email Address"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Confirm Password"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Register
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [role, setSelectedRole] = useState('student'); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setSelectedRole(newRole);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', {
        name,
        email,
        password,
        role,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration Error:', error.response.data);
      alert(error.response.data.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
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

        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            type="text"
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;