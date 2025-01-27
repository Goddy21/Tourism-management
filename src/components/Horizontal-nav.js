import React, { useState, useEffect } from 'react';
import './Horizontal-nav.css';
import { Link, useNavigate } from 'react-router-dom';

const HorizontalNav = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Check for username in localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Set the username if available
    }
  }, []);

  // Logout function to clear username from localStorage
  const handleLogout = () => {
    localStorage.removeItem('username');  // Remove username from localStorage
    setUsername('');  // Clear username state
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <div className='horizontal-nav'>
      <ul>
        {/* Display 'Welcome, {username}' if username exists, otherwise show 'Welcome, User' */}
        <h3>Welcome,</h3>
        <h3>{username ? username : 'User'}</h3>

        {/* Show the Logout button if a username is available (user is logged in) */}
        {username ? (
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link className="button" to={isSignIn ? '/login' : '/signup'}>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Link>
        )}

        {/* Toggle button between Sign In and Sign Up */}
        <button
          className="toggle-button"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </button>
      </ul>
    </div>
  );
};

export default HorizontalNav;
