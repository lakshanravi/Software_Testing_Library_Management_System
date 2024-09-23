import axios from 'axios';

// Create a custom axios instance
const axiosInstance = axios.create();

// Add a request interceptor to include Basic Auth in requests if required
axiosInstance.interceptors.request.use(
  (config) => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    // Log the username, password, and full URL for debugging
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Request URL:', config.url);
    console.log('Request Headers (before):', config.headers);

    if (username && password) {
      const credentials = btoa(`${username}:${password}`);
      config.headers['Authorization'] = `Basic ${credentials}`;
    }

    // No need to set Content-Type for DELETE requests
    if (config.method === 'delete') {
      // Optional: Add any specific headers needed for DELETE requests
      console.log('Sending a DELETE request');
    }

    console.log('Request Headers (after):', config.headers);

    return config;
  },
  (error) => {
    console.error('Request Error:', error); // Log any request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
