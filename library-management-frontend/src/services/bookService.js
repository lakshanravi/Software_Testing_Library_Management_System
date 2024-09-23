import axiosInstance from '../axiosConfig';

const getAvailableBooks = () => {
  return axiosInstance.get('http://localhost:8080/books/available');
};

const getBorrowedBooks = () => {
  return axiosInstance.get('http://localhost:8080/books/borrowed');
};

const addBook = (book) => {
  return axiosInstance.post('http://localhost:8080/books/add', book);
};

const deleteBook = (bookId) => {
  return axiosInstance.delete(`http://localhost:8080/books/delete/${bookId}`);
};

const returnBook = (bookId) => {
  return axiosInstance.post(`http://localhost:8080/books/return/${bookId}`);
};

export {
  addBook,
  deleteBook, getAvailableBooks,
  getBorrowedBooks, returnBook
};

