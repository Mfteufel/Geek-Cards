package com.curso.demo.services;

import com.curso.demo.entity.Card;
import com.curso.demo.exception.ConflictException;
import com.curso.demo.exception.ResourceNotFoundException;
import com.curso.demo.repositories.CardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Page<Card> list(String name, String setName, String rarity, Pageable pageable) {
        if (name != null) {
            return cardRepository.findByNameContainingIgnoreCase(name, pageable);
        }
        if (setName != null) {
            return cardRepository.findBySetNameContainingIgnoreCase(setName, pageable);
        }
        if (rarity != null) {
            return cardRepository.findByRarityIgnoreCase(rarity, pageable);
        }
        return cardRepository.findAll(pageable);
    }

    public Card getById(Long id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Card", id));
    }

    public Card create(Card card) {
        cardRepository.findBySku(card.getSku()).ifPresent(existing -> {
            throw new ConflictException("sku already exists: " + existing.getSku());
        });
        return cardRepository.save(card);
    }

    public Card update(Long id, Card input) {
        Card existing = getById(id);
        if (input.getSku() != null) existing.setSku(input.getSku());
        if (input.getName() != null) existing.setName(input.getName());
        if (input.getDescription() != null) existing.setDescription(input.getDescription());
        if (input.getRarity() != null) existing.setRarity(input.getRarity());
        if (input.getSetName() != null) existing.setSetName(input.getSetName());
        if (input.getConditionValue() != null) existing.setConditionValue(input.getConditionValue());
        if (input.getPriceCents() != null) existing.setPriceCents(input.getPriceCents());
        if (input.getStock() != null) existing.setStock(input.getStock());
        if (input.getImageUrl() != null) existing.setImageUrl(input.getImageUrl());
        return cardRepository.save(existing);
    }

    public void delete(Long id) {
        if (!cardRepository.existsById(id)) {
            throw new ResourceNotFoundException("Card", id);
        }
        cardRepository.deleteById(id);
    }
}
