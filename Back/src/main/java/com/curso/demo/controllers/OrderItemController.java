package com.curso.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.curso.demo.entity.OrderItem;
import com.curso.demo.services.OrderItemService;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.findAll();
    }

    @GetMapping("/{id}")
    public OrderItem getOrderItemById(@PathVariable Long id) {
        return orderItemService.getById(id);
    }

    @GetMapping("/order/{orderId}")
    public List<OrderItem> getOrderItemsByOrder(@PathVariable Long orderId) {
        return orderItemService.findByOrderId(orderId);
    }

    @GetMapping("/card/{cardId}")
    public List<OrderItem> getOrderItemsByCard(@PathVariable Long cardId) {
        return orderItemService.findByCardId(cardId);
    }
}
