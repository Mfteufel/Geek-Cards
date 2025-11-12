package com.curso.demo.services;

import com.curso.demo.dto.RegisterRequest;
import com.curso.demo.entity.User;
import com.curso.demo.exception.BadRequestException;
import com.curso.demo.exception.ConflictException;
import com.curso.demo.exception.ResourceNotFoundException;
import com.curso.demo.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User create(User user) {
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new BadRequestException("email required");
        }
        if (existsByEmail(user.getEmail())) {
            throw new ConflictException("email already exists");
        }
        user.setPasswordHash(encodePassword(user.getPasswordHash()));
        return userRepository.save(user);
    }

    public User update(Long id, User input) {
        User existing = getById(id);
        if (input.getEmail() != null) {
            existing.setEmail(input.getEmail());
        }
        if (input.getFullName() != null) {
            existing.setFullName(input.getFullName());
        }
        if (input.getPasswordHash() != null) {
            existing.setPasswordHash(encodePassword(input.getPasswordHash()));
        }
        return userRepository.save(existing);
    }

    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User", id);
        }
        userRepository.deleteById(id);
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));
    }

    public User register(RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new BadRequestException("email required");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new BadRequestException("password required");
        }
        if (existsByEmail(request.getEmail())) {
            throw new ConflictException("email already exists");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }

    private String encodePassword(String password) {
        if (password == null || password.isBlank()) {
            throw new BadRequestException("password required");
        }
        if (password.startsWith("$2a$") || password.startsWith("$2b$") || password.startsWith("$2y$")) {
            return password;
        }
        return passwordEncoder.encode(password);
    }
}
