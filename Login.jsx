// src/components/Login.jsx

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 
import '../style/Login.css'; 

// 1. Accept onBackToHome as a new prop
const Login = ({ onLoginSuccess, onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);   
    setError('');       

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
    } catch (err) {
      setError('Failed to log in. Please check your email and password.');
      console.error("Firebase login error:", err.message);
    } finally {
      setLoading(false);
      setPassword(''); 
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>

        {/* 2. Add the "Back to Home" button here */}
        <button type="button" onClick={onBackToHome} className="back-button">
          Back to Home
        </button>

      </form>
    </div>
  );
};

export default Login;
