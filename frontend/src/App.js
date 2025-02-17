
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import StudentHome from './StudentHome';
import TeacherHome from './TeacherHome';
import Enrollment from './Enrollment';
import Footer from './Footer';
import Submission from './Submission';
import CourseCreation from './CourseCreation';
import AssignmentCreation from './AssignmentCreation';
import Grading from './Grading';
import CourseDetails from './CourseDetails';
import SubmitFile from './SubmitFile';
import GradeSubmission from './GradeSubmission';
import ForgotPassword from './ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); 
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('role');

    if (loggedIn && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} />
      
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn
              ? role === 'student'
                ? <Navigate to="/studenthome" replace />
                : <Navigate to="/teacherhome" replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn
              ? role === 'student'
                ? <Navigate to="/studenthome" replace />
                : <Navigate to="/teacherhome" replace />
              : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn
              ? role === 'student'
                ? <Navigate to="/studenthome" replace />
                : <Navigate to="/teacherhome" replace />
              : <Register />
          }
        />

        <Route
          path="/studenthome"
          element={
            isLoggedIn && role === 'student'
              ? <StudentHome />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/enrollment"
          element={
            isLoggedIn && role === 'student'
              ? <Enrollment />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/submission"
          element={
            isLoggedIn && role === 'student'
              ? <Submission />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/submitfile/:assignmentId"
          element={
            isLoggedIn && role === 'student'
              ? <SubmitFile />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/teacherhome"
          element={
            isLoggedIn && role === 'teacher'
              ? <TeacherHome />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/coursecreation"
          element={
            isLoggedIn && role === 'teacher'
              ? <CourseCreation />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/assignmentCreation"
          element={
            isLoggedIn && role === 'teacher'
              ? <AssignmentCreation />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/grading"
          element={
            isLoggedIn && role === 'teacher'
              ? <Grading />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/grade/:submissionId"
          element={
            isLoggedIn && role === 'teacher'
              ? <GradeSubmission />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/coursedetails/:id"
          element={
            isLoggedIn
              ? <CourseDetails />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;