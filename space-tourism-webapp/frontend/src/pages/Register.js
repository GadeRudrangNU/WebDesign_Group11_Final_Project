// src/pages/Register.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/apiService';
import '../styles/login.css';
 
const Register = () => {
  const navigate = useNavigate();
 
  const [username,   setUsername]   = useState('');
  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message,    setMessage]    = useState('');
  const [isValid,    setIsValid]    = useState(false);
 
  // same validation as login + non–empty username
  const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validPass  = v => v.length >= 8;
  useEffect(() => {
    setIsValid(
      username.trim().length > 0 &&
      validEmail(email) &&
      validPass(password)
    );
  }, [username, email, password]);
 
  // copy/paste the rocket + stars animations from Login.js
  const createStars = () => {
    const stars = document.createElement('div');
    stars.classList.add('stars');
    for (let i = 0; i < 200; i++) {
      const s = document.createElement('div');
      s.classList.add('star');
      s.style.left = `${Math.random() * 100}%`;
      s.style.top  = `${Math.random() * 100}%`;
      s.style.animationDelay    = `${Math.random() * 5}s`;
      s.style.animationDuration = `${2 + Math.random() * 3}s`;
      stars.appendChild(s);
    }
    document.querySelector('.login-root').appendChild(stars);
  };
  const createSpaceObjects = () => {
    const c = document.createElement('div');
    c.classList.add('space-objects');
    [
      { cls: 'planet', count: 3 },
      { cls: 'moon',   count: 5 },
      { cls: 'comet',  count: 2 },
    ].forEach(({ cls, count }) => {
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.classList.add(cls);
        el.style.top            = `${Math.random() * 100}%`;
        el.style.left           = `${Math.random() * 100}%`;
        el.style.animationDelay = `${Math.random() * 5}s`;
        c.appendChild(el);
      }
    });
    document.querySelector('.login-root').appendChild(c);
  };
  const createSpaceships = () => {
    const container = document.querySelector('.login-root .space-objects');
    if (!container) return;
    for (let i = 0; i < 2; i++) {
      const ship = document.createElement('div');
      ship.innerHTML = '🛸';
      ship.classList.add('spaceship');
      ship.style.top            = `${Math.random() * 80}%`;
      ship.style.left           = `0`;
      ship.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(ship);
    }
  };
  const playRocketAnimation = () => {
    const rocket = document.createElement('div');
    rocket.innerHTML = '🚀';
    rocket.id = 'launch-rocket';
    document.querySelector('.login-root').appendChild(rocket);
    // force reflow so transition applies
    void rocket.offsetHeight;
    rocket.style.bottom = '100%';
  };
 
  useEffect(() => {
    createSpaceObjects();
    createStars();
    createSpaceships();
  }, []);
 
  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValid) {
      setMessage('Please fill all fields & use an 8+ char password.');
      return;
    }
    try {
      // force role="Traveler"
      await registerUser({ username, email, password, role: 'Traveler' });
      setMessage('Registration successful! Redirecting to login…');
      playRocketAnimation();
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.message || 'Registration failed.');
    }
  };
 
  return (
    <div className="login-root">
      <h2>Sign Up for Space Adventure</h2>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="registerUsername">Username</label>
            <input
              id="registerUsername"
              type="text"
              className="form-control"
              placeholder="Choose a username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registerEmail">Email</label>
            <input
              id="registerEmail"
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registerPassword">Password</label>
            <div className="input-group">
              <input
                id="registerPassword"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(s => !s)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!isValid}>
            Sign Up
          </button>
          {message && <p className="feedback">{message}</p>}
        </form>
        <p className="form-text">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};
 
export default Register;
 
 