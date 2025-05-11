import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
  const [role, setRole] = useState('Bidder');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleRoleClick = (selectedRole) => {
    setRole(selectedRole);
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setRole(''); // Reset role when switching modes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can add authentication logic

    // Redirect based on selected role
    if (role === 'Admin') {
      navigate('/admin-dashboard');
    } else if (role === 'Bidder') {
      navigate('/bidder-dashboard');
    } else if (role === 'Buyer') {
      navigate('/buyer-dashboard');
    } else if (role === 'Evaluator') {
      navigate('/evaluator-dashboard');
    }
  };

  const renderForm = () => {
    if (!role) return null;

    return (
      <form onSubmit={handleSubmit}>
        <h2>{role} {isSignup ? 'Sign Up' : 'Login'}</h2>
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter password" required />
        </div>
        {isSignup && (
          <>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" required />
            </div>
              {role !== 'Buyer' && ( 
              <div className="form-group">
                <label>Name</label>
                <input type="email" placeholder="Enter Name" required />
              </div>)
            }
            {role === 'Buyer' && ( 
              <div className="form-group">
                <label>Organization Name</label>
                <input type="email" placeholder="Enter Organization Name" required />
            </div>)
            }
            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" placeholder="Enter contact number" required />
            </div>
            {role === 'Buyer' && (
              <div className="form-group">
                <label>Organization Address</label>
                <input type="text" placeholder="Enter organization address" required />
              </div>
            )}
          </>
        )}
        <button type="submit" className="submit-button">
          {isSignup ? 'Sign Up' : `Login as ${role}`}
        </button>
      </form>
    );
  };

  useEffect(() => {
    setRole('Bidder');
  }, []);

  return (
    <div className="page-wrapper">
      <div className="heading-wrapper">
        <h1 className="heading">Welcome to Smart Tender Hub</h1>
      </div>
      <div className="main-wrapper">
        <div className="container">
          <div className="toggle-wrapper">
            {['Admin', 'Bidder', 'Buyer', 'Evaluator'].map((r) => (
              <button
                key={r}
                className={`toggle-button ${role === r ? 'active' : ''}`}
                onClick={() => handleRoleClick(r)}
              >
                {r}
              </button>
            ))}
          </div>
          {renderForm()}
          <p className="switch-text">
            {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
            <button className="switch-button" onClick={toggleMode}>
              {isSignup ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
