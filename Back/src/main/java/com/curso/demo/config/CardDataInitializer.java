package com.curso.demo.config;

import com.curso.demo.services.CardImportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CardDataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(CardDataInitializer.class);

    private final CardImportService cardImportService;
    private final boolean importOnStart;

    public CardDataInitializer(CardImportService cardImportService,
                               @Value("${cards.import-on-start:true}") boolean importOnStart) {
        this.cardImportService = cardImportService;
        this.importOnStart = importOnStart;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!importOnStart) {
            log.info("Skipping card import (cards.import-on-start=false)");
            return;
        }
        int imported = cardImportService.importIfEmpty();
        if (imported > 0) {
            log.info("Imported {} cards into the database", imported);
        }
    }
}
