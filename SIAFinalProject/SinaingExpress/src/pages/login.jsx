import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Login.css';
import pixelpassLogo from '/public/assets/pixelpass.png'; // Adjust if path differs

const Login = () => {
  const navigate = useNavigate();
  const { login } = useCart();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // <-- Add this line

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('username', data.username); // 🔑 Save username
        login({ username: data.username }); // Pass user object to context
        setLoginSuccess(true); // <-- Show success message
        setTimeout(() => {
          navigate('/dashboard'); // Redirect after short delay
        }, 1200);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  // Caps Lock detection handler
  const handleCapsLock = (e) => {
    setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">PixelPass</h1>
        <img src={pixelpassLogo} alt="PixelPass Logo" className="pixelpass-logo" />
        <p className="tagline">Log in to your digital realm</p>
        {loginSuccess && (
          <div style={{
            color: '#4caf50',
            marginBottom: '10px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Login successful! Redirecting...
          </div>
        )}
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                paddingRight: '2.5rem', // space for the icon
                boxSizing: 'border-box'
              }}
              onKeyUp={handleCapsLock}
              onKeyDown={handleCapsLock}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#bfa6e0',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                userSelect: 'none',
                zIndex: 2
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
              role="button"
            >
              {showPassword ? (
                // Simple "eye-off" SVG
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bfa6e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.13"/>
                  <path d="M1 1l22 22"/>
                  <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/>
                  <path d="M14.47 14.47A3.5 3.5 0 0 0 12 8.5c-.63 0-1.22.18-1.72.49"/>
                </svg>
              ) : (
                // Simple "eye" SVG
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bfa6e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="12" rx="9" ry="7"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </span>
            {capsLockOn && (
              <div style={{
                color: '#e57373',
                fontSize: '0.85rem',
                position: 'absolute',
                left: 0,
                top: '100%',
                marginTop: '2px'
              }}>
               Caps Lock is ON
              </div>
            )}
          </div>
          <button type="submit">Log In</button>
        </form>
        <p className="signup-text">
          New to PixelPass? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
