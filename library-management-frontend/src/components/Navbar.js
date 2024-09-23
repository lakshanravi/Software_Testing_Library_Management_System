import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Clear session storage if used
    sessionStorage.clear();
    // Optionally clear cookies (if necessary)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // Redirect to login
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
           
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            {username ? (
              <>
                {localStorage.getItem('role') === 'admin' ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-dashboard">User Dashboard</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-danger nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
