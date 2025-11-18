package com.curso.demo.dto;

public class AuthResponse {

    private String token;
    private long expiresIn;
    private Long userId;
    private String email;
    private String fullName;

    public AuthResponse(String token, long expiresIn, Long userId, String email, String fullName) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
    }

    public String getToken() {
        return token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }
}
