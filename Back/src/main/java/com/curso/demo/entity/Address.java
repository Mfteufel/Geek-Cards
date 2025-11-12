package com.curso.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.Instant;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "addresses", indexes = {
        @Index(name = "idx_addr_city", columnList = "city"),
        @Index(name = "idx_addr_postal", columnList = "postalCode"),
        @Index(name = "idx_addr_user", columnList = "user_id")
})
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties(value = {"addresses", "orders"}, allowSetters = true)
    private User user;

    @Column(nullable = false, length = 255)
    private String fullName;

    @Column(length = 40)
    private String phone;

    @Column(nullable = false, length = 255)
    private String line1;

    @Column(length = 255)
    private String line2;

    @Column(nullable = false, length = 120)
    private String city;

    @Column(length = 120)
    private String state;

    @Column(nullable = false, length = 30)
    private String postalCode;

    @Column(nullable = false, length = 2)
    private String countryCode; 

    @Column(nullable = false)
    private boolean isDefaultAddress = false;

    @Column(nullable = false, updatable = false)
    @Setter(AccessLevel.NONE)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }
}
