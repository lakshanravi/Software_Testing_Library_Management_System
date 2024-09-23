// src/pages/Home.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('http://localhost:8080/books/available');
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-container">
            <div className="container text-center">
                <h1 className="my-4">Available Books</h1>
                <p className="intro-text">Welcome to our library management system! Browse our collection of available books below.</p>
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="search-box form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className="book-list mt-4">
                    {filteredBooks.map(book => (
                        <li key={book.id} className="book-item list-group-item">
                            {book.title} - {book.author}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
