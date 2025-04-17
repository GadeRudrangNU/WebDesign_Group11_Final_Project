// frontend/src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation helpers
  const validateEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePassword = v => v.length >= 8;

  // Re‑validate form whenever inputs change
  useEffect(() => {
    setIsFormValid(validateEmail(email) && validatePassword(password));
  }, [email, password]);

  // Background animations (stars, planets, comets, ships)
  const createStars = () => {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      starsContainer.appendChild(star);
    }
    document.querySelector('.login-root').appendChild(starsContainer);
  };

  const createSpaceObjects = () => {
    const container = document.createElement('div');
    container.classList.add('space-objects');
    const objs = [
      { cls: 'planet', count: 3 },
      { cls: 'moon', count: 5 },
      { cls: 'comet', count: 2 },
    ];
    objs.forEach(({ cls, count }) => {
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.classList.add(cls);
        el.style.top = `${Math.random() * 100}%`;
        el.style.left = `${Math.random() * 100}%`;
        el.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(el);
      }
    });
    document.querySelector('.login-root').appendChild(container);
  };

  const createSpaceships = () => {
    const container = document.querySelector('.login-root .space-objects');
    if (!container) return;
    for (let i = 0; i < 2; i++) {
      const ship = document.createElement('div');
      ship.innerHTML = '🛸';
      ship.classList.add('spaceship');
      ship.style.top = `${Math.random() * 80}%`;
      ship.style.left = '0';
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

  // On mount, build background
  useEffect(() => {
    createSpaceObjects();
    createStars();
    createSpaceships();
  }, []);

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    if (!isFormValid) {
      setMessage('Please enter a valid email and an 8+ character password.');
      return;
    }
    try {
      const data = await loginUser({ email, password });
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        setMessage('Login successful!');
        playRocketAnimation();

        let dest = '/home';
        switch (data.user.role) {
          case 'Admin': dest = '/admin'; break;
          case 'TripCoordinator': dest = '/coordinator'; break;
          case 'CertifiedSpaceGuide': dest = '/guide'; break;
          case 'Trainee': dest = '/trainer'; break;
        }

        setTimeout(() => navigate(dest), 2500);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch {
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div className="login-root">
      <h2>Login to Space Adventure</h2>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword">Password</label>
            <div className="input-group">
              <input
                id="loginPassword"
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
          <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
            Login
          </button>
          {message && <p className="feedback">{message}</p>}
        </form>
        <p className="form-text">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
