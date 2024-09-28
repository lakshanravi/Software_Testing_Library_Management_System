package com.example.library.controller;

import com.example.library.Models.Book;
import com.example.library.Models.User;
import com.example.library.service.BookService;
import com.example.library.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class BookControllerTest {

    @Mock
    private BookService bookService;

    @Mock
    private UserService userService;

    @InjectMocks
    private BookController bookController;

    private Book book;
    private User user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        user = new User();
        user.setUsername("testUser");
    }

    @Test
    public void testAddBook() {
        when(bookService.addBook(any(Book.class))).thenReturn(book);

        Book addedBook = bookController.addBook(book);

        assertNotNull(addedBook);
        assertEquals("Test Book", addedBook.getTitle());
        verify(bookService, times(1)).addBook(any(Book.class));
    }

    @Test
    public void testGetAvailableBooks() {
        when(bookService.findAvailableBooks()).thenReturn(Arrays.asList(book));

        List<Book> availableBooks = bookController.getAvailableBooks();

        assertNotNull(availableBooks);
        assertEquals(1, availableBooks.size());
        assertEquals("Test Book", availableBooks.get(0).getTitle());
    }

    @Test
    public void testBorrowBook_UserNotFound() {
        when(userService.findByUsername("nonExistentUser")).thenReturn(Optional.empty());

        ResponseEntity<Book> response = bookController.borrowBook(1L, "nonExistentUser");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    public void testBorrowBook_BookNotAvailable() {
        when(userService.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(bookService.borrowBook(anyLong(), any(User.class))).thenReturn(Optional.empty());

        ResponseEntity<Book> response = bookController.borrowBook(1L, "testUser");

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    public void testBorrowBook_Success() {
        when(userService.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(bookService.borrowBook(anyLong(), any(User.class))).thenReturn(Optional.of(book));

        ResponseEntity<Book> response = bookController.borrowBook(1L, "testUser");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Test Book", response.getBody().getTitle());
    }

    @Test
    public void testReturnBook() {
        when(bookService.returnBook(anyLong())).thenReturn(Optional.of(book));

        Optional<Book> returnedBook = bookController.returnBook(1L);

        assertTrue(returnedBook.isPresent());
        assertEquals("Test Book", returnedBook.get().getTitle());
    }

    @Test
    public void testDeleteBook() {
        doNothing().when(bookService).deleteBook(anyLong());

        ResponseEntity<String> response = bookController.deleteBook(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Book deleted successfully", response.getBody());
        verify(bookService, times(1)).deleteBook(anyLong());
    }

    @Test
    public void testGetBorrowedBooks() {
        when(bookService.findBorrowedBooks()).thenReturn(Arrays.asList(book));

        List<Book> borrowedBooks = bookController.getBorrowedBooks();

        assertNotNull(borrowedBooks);
        assertEquals(1, borrowedBooks.size());
        assertEquals("Test Book", borrowedBooks.get(0).getTitle());
    }
}
