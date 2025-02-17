
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn, role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <NavLink to="/" className="nav-link">LMS</NavLink>
        </div>
        
        {isLoggedIn && role === 'student' && (
          <NavLink to="/studenthome" className="nav-link">Student Home</NavLink>
        )}
        {isLoggedIn && role === 'teacher' && (
          <NavLink to="/teacherhome" className="nav-link">Teacher Home</NavLink>
        )}
      </div>

      <ul className="nav-links">
        

        {isLoggedIn && role === 'student' && (
          <>
            <li><NavLink to="/enrollment" className="nav-link">Enrollment</NavLink></li>
            <li><NavLink to="/submission" className="nav-link">Submission</NavLink></li>
          </>
        )}

        {isLoggedIn && role === 'teacher' && (
          <>
            <li><NavLink to="/coursecreation" className="nav-link">Course Creation</NavLink></li>
            <li><NavLink to="/assignmentcreation" className="nav-link">Create an Assignment</NavLink></li>
            <li><NavLink to="/grading" className="nav-link">Grading</NavLink></li>
          </>
        )}

        {!isLoggedIn ? (
          <>
            <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
            <li><NavLink to="/register" className="nav-link">Register</NavLink></li>
          </>
        ) : (
          <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;