package com.example.library.frontendTest;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ibraryManagementTest {
    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        // Set up WebDriver
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/"); // Replace with your frontend URL
    }

    @Test
    public void testLogin() {
        // Navigate to login page
        WebElement loginLink = driver.findElement(By.linkText("Login"));
        loginLink.click();

        // Enter username and password
        WebElement usernameInput = driver.findElement(By.xpath("//input[@placeholder='Username']"));
        WebElement passwordInput = driver.findElement(By.xpath("//input[@placeholder='Password']"));
        usernameInput.sendKeys("newuserr"); // Replace with valid username
        passwordInput.sendKeys("newpassword"); // Replace with valid password

        // Click the login button
        WebElement loginButton = driver.findElement(By.xpath("//button[text()='Login']"));
        loginButton.click();

        // Verify successful login by checking the URL or checking for an element specific to the dashboard
        String currentUrl = driver.getCurrentUrl();
        assertEquals("http://localhost:3000/user-dashboard", currentUrl, "Login was not successful, URL did not match.");
    }

    @Test
    public void testViewBooks() {
        testLogin(); // Ensure login before viewing books

        // Navigate to the books section (assuming it’s accessible after login)
        driver.get("http://localhost:3000/user-dashboard"); // Adjust as needed

        // Verify books are displayed (adjust the selector based on your structure)
        WebElement booksSection = driver.findElement(By.id("books-section")); // Adjust selector to your page structure
        assertTrue(booksSection.isDisplayed(), "Books section is not displayed.");
    }

    @Test
    public void testBorrowBook() {
        testLogin(); // Ensure login before borrowing a book

        // Navigate to the books section
        driver.get("http://localhost:3000/books"); // Adjust the URL as needed

        // Click on a borrow button for the first book
        WebElement borrowButton = driver.findElement(By.xpath("(//button[text()='Borrow'])[1]"));
        borrowButton.click();

        // Wait for confirmation message
        WebElement confirmationMessage = driver.findElement(By.className("confirmation")); // Adjust based on your actual confirmation
        assertTrue(confirmationMessage.getText().contains("You have successfully borrowed"), "Confirmation message not found.");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
