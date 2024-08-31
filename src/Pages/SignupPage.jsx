import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== rePassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, rePassword, phone }),
      });

      const data = await response.json();

      if (response.ok) {

        navigate('/login');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rePassword">Confirm Password:</label>
          <input
            type="password"
            id="rePassword"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
