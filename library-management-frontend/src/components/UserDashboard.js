import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username') || 'default_username';

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('http://localhost:8080/books/available');
        setBooks(response.data);
      } catch (error) {
        setError('Error fetching books');
        console.error('Error fetching books', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const borrowBook = async (bookId) => {
    try {
      await axiosInstance.post(`http://localhost:8080/books/borrow/${bookId}?username=${username}`, {});
      
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, available: false } : book
        )
      );

      alert('Book borrowed successfully!');
    } catch (error) {
      const errorMessage = error.response ? error.response.data : 'Error borrowing book. Please try again later.';
      alert(errorMessage);
      console.error('Borrow book error:', error);
    }
  };

  if (loading) {
    return <p className="text-center">Loading books...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center">User Dashboard</h1>
      <ul className="list-group mt-3">
        {books.map(book => (
          <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{book.title}</strong> - {book.author}
            </div>
            {book.available ? (
              <button className="btn btn-primary" onClick={() => borrowBook(book.id)}>
                Borrow
              </button>
            ) : (
              <span className="text-muted">Not Available</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDashboard;
