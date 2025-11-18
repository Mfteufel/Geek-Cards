package com.curso.demo.controllers;

import com.curso.demo.services.CardImportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cards/import")
public class CardImportController {

    private static final Logger log = LoggerFactory.getLogger(CardImportController.class);

    private final CardImportService cardImportService;

    public CardImportController(CardImportService cardImportService) {
        this.cardImportService = cardImportService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> importCards(@RequestParam(defaultValue = "false") boolean force) throws IOException {
        int imported = force ? cardImportService.importAll() : cardImportService.importIfEmpty();
        Map<String, Object> response = new HashMap<>();
        response.put("imported", imported);
        response.put("forced", force);
        response.put("message", buildMessage(imported, force));
        return ResponseEntity.ok(response);
    }

    private String buildMessage(int imported, boolean force) {
        if (imported == 0) {
            return force
                    ? "No se agregaron cartas nuevas (todas las SKU ya existían)."
                    : "La tabla ya contenía cartas, no se realizaron cambios.";
        }
        log.info("Se importaron {} cartas (force={})", imported, force);
        return "Se importaron " + imported + " cartas.";
    }
}
