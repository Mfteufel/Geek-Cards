package com.curso.demo.services;

import com.curso.demo.entity.Card;
import com.curso.demo.repositories.CardRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CardImportService {

    private static final Logger log = LoggerFactory.getLogger(CardImportService.class);

    private final CardRepository cardRepository;
    private final ObjectMapper objectMapper;
    private final Resource cardsDataResource;

    public CardImportService(CardRepository cardRepository,
                             ObjectMapper objectMapper,
                             @Value("${cards.data.resource:classpath:data/swu_todas_por_expansion.json}")
                             Resource cardsDataResource) {
        this.cardRepository = cardRepository;
        this.objectMapper = objectMapper;
        this.cardsDataResource = cardsDataResource;
    }

    /**
     * Imports cards if the table is empty. Returns the amount of cards inserted.
     */
    public int importIfEmpty() throws IOException {
        if (cardRepository.count() > 0) {
            log.info("Skipping card import because cards table already has data");
            return 0;
        }
        return importAll();
    }

    /**
     * Imports all cards from the configured JSON file. Already existing SKUs are skipped.
     */
    public int importAll() throws IOException {
        try (InputStream inputStream = cardsDataResource.getInputStream()) {
            JsonNode root = objectMapper.readTree(inputStream);
            int imported = 0;

            for (JsonNode expansionNode : root) {
                String setCode = expansionNode.path("code").asText("");
                String setName = expansionNode.path("name").asText(setCode);
                JsonNode cardsNode = expansionNode.path("cards").path("data");

                if (!cardsNode.isArray()) {
                    continue;
                }

                for (JsonNode cardNode : cardsNode) {
                    String sku = buildSku(cardNode);
                    if (sku == null || cardRepository.findBySku(sku).isPresent()) {
                        continue;
                    }

                    Card card = new Card();
                    card.setSku(sku);
                    card.setName(cardNode.path("Name").asText("Unknown"));
                    card.setDescription(cardNode.path("FrontText").asText(null));
                    card.setRarity(cardNode.path("Rarity").asText(null));
                    card.setSetName(setName);
                    card.setConditionValue("NM");
                    card.setPriceCents(extractPrice(cardNode));
                    card.setStock(0);
                    card.setImageUrl(cardNode.path("FrontArt").asText(null));

                    cardRepository.save(card);
                    imported++;
                }
            }

            log.info("Card import finished. Inserted {} new cards.", imported);
            return imported;
        }
    }

    private String buildSku(JsonNode cardNode) {
        String set = cardNode.path("Set").asText("").trim();
        String number = cardNode.path("Number").asText("").trim();
        if (set.isEmpty() || number.isEmpty()) {
            return null;
        }
        return set + "-" + number;
    }

    private int extractPrice(JsonNode cardNode) {
        String rawPrice = cardNode.path("LowPrice").asText(cardNode.path("MarketPrice").asText("0"));
        try {
            BigDecimal price = new BigDecimal(rawPrice.replace("$", "").trim());
            return price.multiply(BigDecimal.valueOf(100))
                    .setScale(0, RoundingMode.HALF_UP)
                    .intValueExact();
        } catch (Exception ex) {
            return 0;
        }
    }
}
