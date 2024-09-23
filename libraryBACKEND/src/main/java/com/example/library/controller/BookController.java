package com.example.library.controller;

import com.example.library.Models.Book;
import com.example.library.Models.User;
import com.example.library.service.BookService;
import com.example.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*") // Allow requests from React frontend
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;
//only for admin post reqest using basic auth admin passward and username
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend

@PostMapping("/add")
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @GetMapping("/available")
    public List<Book> getAvailableBooks() {
        return bookService.findAvailableBooks();
    }
//only for user post reqest using basic auth admin passward and username
    @PostMapping("/borrow/{bookId}")
    public ResponseEntity<Book> borrowBook(@PathVariable Long bookId, @RequestParam String username) {
        Optional<User> user = userService.findByUsername(username);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Return 404 if user not found
        }

        Optional<Book> book = bookService.borrowBook(bookId, user.get());

        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());  // Return the borrowed book if successful
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);  // Return 409 if book can't be borrowed
        }
    }
//only for admin post reqest using basic auth admin passward and username

    @PostMapping("/return/{bookId}")
    public Optional<Book> returnBook(@PathVariable Long bookId) {
        return bookService.returnBook(bookId);
    }

    //only for admin post reqest using basic auth admin passward and username
    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity<String> deleteBook(@PathVariable Long bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("Book deleted successfully");
    }

    @GetMapping("/borrowed")
    public List<Book> getBorrowedBooks() {
        return bookService.findBorrowedBooks();
    }
}
