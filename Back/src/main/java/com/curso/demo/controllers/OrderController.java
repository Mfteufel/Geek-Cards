package com.curso.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.curso.demo.dto.CreateOrderRequest;
import com.curso.demo.entity.Order;
import com.curso.demo.entity.enums.OrderStatus;
import com.curso.demo.services.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public Page<Order> getOrders(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(Math.max(0, page), Math.max(1, size));
        return orderService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getById(id);
    }

    @PostMapping
    public Order addOrder(@RequestBody CreateOrderRequest request) {
        return orderService.createOrder(request);
    }

    @PatchMapping("/{id}/status")
    public Order updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        return orderService.updateStatus(id, status);
    }
}
