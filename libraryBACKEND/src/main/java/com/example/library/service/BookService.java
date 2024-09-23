package com.example.library.service;

import com.example.library.Models.Book;
import com.example.library.Models.User;
import com.example.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Method to add a new book
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Method to find all available books
    public List<Book> findAvailableBooks() {
        return bookRepository.findByAvailable(true);
    }

    public List<Book> findBorrowedBooks() {
        return bookRepository.findByAvailable(false);  // Finds all books that are currently borrowed
    }
    // Method to borrow a book
    public Optional<Book> borrowBook(Long bookId, User user) {
        return bookRepository.findById(bookId).map(book -> {
            if (book.getAvailable()) {  // Check if the book is available for borrowing
                book.setAvailable(false);  // Mark the book as borrowed
                book.setBorrowedBy(user);  // Set the user who borrowed the book
                return bookRepository.save(book);  // Save the updated book information
            } else {
                return null;  // Book is not available for borrowing
            }
        });
    }

    // Method to return a borrowed book
    public Optional<Book> returnBook(Long bookId) {
        return bookRepository.findById(bookId).map(book -> {
            if (!book.getAvailable()) {  // Check if the book is currently borrowed
                book.setAvailable(true);  // Mark the book as available again
                book.setBorrowedBy(null);  // Clear the user who borrowed the book
                return bookRepository.save(book);  // Save the updated book information
            } else {
                return null;  // Book was not borrowed
            }
        });
    }

    // Method to delete a book by its ID
    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }
}
