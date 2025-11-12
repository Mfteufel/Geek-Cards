package com.curso.demo.services;

import com.curso.demo.entity.OrderItem;
import com.curso.demo.exception.ResourceNotFoundException;
import com.curso.demo.repositories.OrderItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    public OrderItem getById(Long id) {
        return orderItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("OrderItem", id));
    }

    public List<OrderItem> findByOrderId(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    public List<OrderItem> findByCardId(Long cardId) {
        return orderItemRepository.findByCardId(cardId);
    }
}
