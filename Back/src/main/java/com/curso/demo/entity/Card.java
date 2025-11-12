package com.curso.demo.entity;

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
@Table(name = "cards", indexes = {
        @Index(name = "idx_cards_name", columnList = "name"),
        @Index(name = "idx_cards_set_name", columnList = "setName")
})
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    private String sku;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String rarity;

    @Column(length = 100)
    private String setName;

    @Column(length = 30)
    private String conditionValue = "NM";

    @Column(nullable = false)
    private Integer priceCents;

    @Column(nullable = false)
    private Integer stock = 0;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @Column(nullable = false, updatable = false)
    @Setter(AccessLevel.NONE)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }
}
