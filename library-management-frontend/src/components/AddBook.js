import React, { useState } from 'react';
import { addBook } from '../services/bookService';
import './AddBook.css'; // Import the CSS file

const AddBook = ({ fetchAvailableBooks, setErrorMessage, setSuccessMessage }) => {
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author) {
      setErrorMessage('Please fill in both the title and author.');
      return;
    }

    addBook(newBook)
      .then(() => {
        setSuccessMessage('Book added successfully!');
        fetchAvailableBooks();
        setNewBook({ title: '', author: '' });
      })
      .catch(error => {
        console.error('Error adding book', error);
        setErrorMessage('Failed to add book. Please try again.');
      });
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        className="book-input"
      />
      <input
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        className="book-input"
      />
      <button onClick={handleAddBook} className="add-button">Add Book</button>
    </div>
  );
};

export default AddBook;
