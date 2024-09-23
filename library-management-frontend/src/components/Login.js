import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axiosInstance.post('http://localhost:8080/users/logine', { username, password })
      .then(response => {
        const responseData = response.data;

        if (responseData.includes('Login successful! Role: admin')) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password); // Save password
          localStorage.setItem('role', 'admin');
          navigate('/admin-dashboard');  // Navigate to admin dashboard
        } else if (responseData.includes('Login successful! Role: user')) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password); // Save password
          localStorage.setItem('role', 'user');
          navigate('/user-dashboard');  // Navigate to user dashboard
        } else {
          setErrorMessage('Unexpected login response!');
        }
      })
      .catch(error => {
        console.error('Login failed', error);
        setErrorMessage('Invalid username or password!');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
    </div>
  );
}

export default Login;
