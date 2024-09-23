import axiosInstance from '../axiosConfig';

const registerUser = (user) => {
  return axiosInstance.post('http://localhost:8080/users/register', user);
};

export { registerUser };
