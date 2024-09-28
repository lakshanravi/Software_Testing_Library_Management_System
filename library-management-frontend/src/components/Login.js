import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the auth context
import axiosInstance from '../axiosConfig';

function Login() {
  const { login } = useAuth(); // Get login function from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    // Clear previous error message
    setErrorMessage('');

    axiosInstance.post('http://localhost:8080/users/logine', { username, password })
      .then(response => {
        const responseData = response.data;

        if (responseData.includes('Login successful! Role: admin')) {
          login(username, password, 'admin'); // Use login function from context
          navigate('/admin-dashboard');
        } else if (responseData.includes('Login successful! Role: user')) {
          login(username, password, 'user');
         // Use login function from context
          navigate('/user-dashboard');
        } else {
          setErrorMessage('Unexpected login response!');
        }
      })
      .catch(error => {
        console.error('Login failed', error);
        setErrorMessage('Invalid username or password!');
      })
      .finally(() => {
        setLoading(false); // Set loading to false after request completes
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
            disabled={loading} // Disable input during loading
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Disable input during loading
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
        </button>
      </form>
      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
    </div>
  );
}

export default Login;
