package com.example.library.config;

import com.example.library.Models.User;
import com.example.library.service.CustomUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @InjectMocks
    private SecurityConfig securityConfig;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @WithMockUser(roles = "user")
    void testUserAccessToBorrowBook() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/books/borrow/1?username=testuser"))
                .andExpect(status().isOk()); // User role should access borrow endpoint
    }

    @Test
    @WithMockUser(roles = "admin")
    void testAdminAccessToDeleteBook() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/books/delete/1"))
                .andExpect(status().isOk()); // Admin role should access delete endpoint
    }

    @Test
    @WithMockUser(roles = "user")
    void testUserCannotAccessAdminEndpoints() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/books/delete/1"))
                .andExpect(status().isForbidden()); // Non-admin should not access delete endpoint
    }
}
