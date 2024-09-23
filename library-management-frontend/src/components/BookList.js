import React from 'react';

const BookList = ({ books, onDelete }) => {
  return (
    <ul className="list-group">
      {books.map(book => (
        <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
          <strong>{book.title}</strong> by {book.author}
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(book.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
