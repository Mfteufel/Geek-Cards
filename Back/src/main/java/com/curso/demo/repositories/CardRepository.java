package com.curso.demo.repositories;

import com.curso.demo.entity.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findBySku(String sku);
    Page<Card> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<Card> findBySetNameContainingIgnoreCase(String setName, Pageable pageable);
    Page<Card> findByRarityIgnoreCase(String rarity, Pageable pageable);
}
