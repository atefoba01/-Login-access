import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        setIsLoggedIn(true);
        console.log('Login successful:', data);
      } else {
        setMessage('Login failed: ' + data.message);
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login Form</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h3>Welcome, {formData.name}!</h3>
          <p>You are now logged in.</p>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
