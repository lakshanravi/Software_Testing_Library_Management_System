import React, { useEffect, useState } from 'react';
import { deleteBook, getAvailableBooks, getBorrowedBooks, returnBook } from '../services/bookService';
import AddBook from './AddBook';
import './AdminDashboard.css'; // Import the CSS file
import BookList from './BookList';
import RegisterUser from './RegisterUser';

function AdminDashboard() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [availableSearchTerm, setAvailableSearchTerm] = useState('');
  const [borrowedSearchTerm, setBorrowedSearchTerm] = useState('');

  useEffect(() => {
    fetchAvailableBooks();
    fetchBorrowedBooks();
  }, []);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [successMessage, errorMessage]);

  const fetchAvailableBooks = () => {
    getAvailableBooks()
      .then(response => setAvailableBooks(response.data))
      .catch(error => {
        console.error('Error fetching available books', error);
        setErrorMessage('Failed to fetch available books. Please try again later.');
      });
  };

  const fetchBorrowedBooks = () => {
    getBorrowedBooks()
      .then(response => setBorrowedBooks(response.data))
      .catch(error => {
        console.error('Error fetching borrowed books', error);
        setErrorMessage('Failed to fetch borrowed books. Please try again later.');
      });
  };

  const handleDeleteBook = (bookId) => {
    deleteBook(bookId)
      .then(() => {
        setAvailableBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        setSuccessMessage('Book deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting book', error);
        setErrorMessage('Failed to delete book. Please try again.');
      });
  };

  const handleReturnBook = (bookId) => {
    returnBook(bookId)
      .then(() => {
        setBorrowedBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        setSuccessMessage('Book returned successfully!');
      })
      .catch(error => {
        console.error('Error returning book', error);
        setErrorMessage('Failed to return book. Please try again.');
      });
  };

  const filteredAvailableBooks = availableBooks.filter(book =>
    book.title.toLowerCase().includes(availableSearchTerm.toLowerCase())
  );

  const filteredBorrowedBooks = borrowedBooks.filter(book =>
    book.title.toLowerCase().includes(borrowedSearchTerm.toLowerCase()) ||
    (book.borrowedBy && book.borrowedBy.username.toLowerCase().includes(borrowedSearchTerm.toLowerCase()))
  );

  return (
    <div className="container admin-dashboard">
      <h1 className="my-4">Admin Dashboard</h1>

      {successMessage && 
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      }
      {errorMessage && 
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      }

      <div className="row mb-4">
        <div className="col-md-6">
          <AddBook 
            fetchAvailableBooks={fetchAvailableBooks} 
            setErrorMessage={setErrorMessage} 
            setSuccessMessage={setSuccessMessage} 
          />
        </div>
        <div className="col-md-6">
          <RegisterUser 
            setErrorMessage={setErrorMessage} 
            setSuccessMessage={setSuccessMessage} 
          />
        </div>
      </div>

      <div className="section mb-4">
        <h2>Available Books</h2>
        <input
          type="text"
          placeholder="Search available books by name"
          value={availableSearchTerm}
          onChange={(e) => setAvailableSearchTerm(e.target.value)}
          className="form-control mb-2"
        />
        <BookList books={filteredAvailableBooks} onDelete={handleDeleteBook} />
      </div>

      <div className="section">
        <h2>Borrowed Books</h2>
        <input
          type="text"
          placeholder="Search borrowed books by name or borrower"
          value={borrowedSearchTerm}
          onChange={(e) => setBorrowedSearchTerm(e.target.value)}
          className="form-control mb-2"
        />
        <ul className="list-group">
          {filteredBorrowedBooks.map(book => (
            <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{book.title}</strong> by {book.author} 
                {book.borrowedBy ? ` (Borrowed by: ${book.borrowedBy.username})` : ' (Borrowed by: Unknown)'}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleReturnBook(book.id)}>Return</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
