package com.curso.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class OrderItemRequest {

    @NotNull
    private Long cardId;

    @NotNull
    @Min(0)
    private Integer unitPriceCents;

    @NotNull
    @Min(1)
    private Integer quantity;

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public Integer getUnitPriceCents() {
        return unitPriceCents;
    }

    public void setUnitPriceCents(Integer unitPriceCents) {
        this.unitPriceCents = unitPriceCents;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
