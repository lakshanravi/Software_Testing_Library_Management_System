import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the auth context
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserDashboard from './components/UserDashboard';
import Contact from './components/contact';

function App() {
  const { isLoggedIn, role } = useAuth(); // Get auth state from context

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin-dashboard"
          element={isLoggedIn && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-dashboard"
          element={isLoggedIn && role === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
