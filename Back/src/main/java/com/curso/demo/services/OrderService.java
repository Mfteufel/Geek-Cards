package com.curso.demo.services;

import com.curso.demo.dto.AddressRequest;
import com.curso.demo.dto.CreateOrderRequest;
import com.curso.demo.dto.OrderItemRequest;
import com.curso.demo.entity.Address;
import com.curso.demo.entity.Card;
import com.curso.demo.entity.Order;
import com.curso.demo.entity.OrderItem;
import com.curso.demo.entity.User;
import com.curso.demo.entity.enums.OrderStatus;
import com.curso.demo.exception.BadRequestException;
import com.curso.demo.exception.ResourceNotFoundException;
import com.curso.demo.repositories.AddressRepository;
import com.curso.demo.repositories.CardRepository;
import com.curso.demo.repositories.OrderRepository;
import com.curso.demo.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final CardRepository cardRepository;

    public OrderService(OrderRepository orderRepository,
                        UserRepository userRepository,
                        AddressRepository addressRepository,
                        CardRepository cardRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.cardRepository = cardRepository;
    }

    public Page<Order> findAll(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public Page<Order> findByUserId(Long userId, Pageable pageable) {
        return orderRepository.findByUserId(userId, pageable);
    }

    public Order getById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", id));
    }

    public Order createOrder(CreateOrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", request.getUserId()));

        Address address = resolveAddressForOrder(user, request);

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("items are required");
        }

        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setCurrency(request.getCurrency() != null ? request.getCurrency() : "USD");

        int subtotal = 0;

        for (OrderItemRequest itemRequest : request.getItems()) {
            if (itemRequest.getCardId() == null ||
                    itemRequest.getUnitPriceCents() == null ||
                    itemRequest.getQuantity() == null) {
                throw new BadRequestException("each item requires cardId, unitPriceCents and quantity");
            }

            Card card = cardRepository.findById(itemRequest.getCardId())
                    .orElseThrow(() -> new ResourceNotFoundException("Card", itemRequest.getCardId()));

            OrderItem item = new OrderItem();
            item.setCard(card);
            item.setUnitPriceCents(itemRequest.getUnitPriceCents());
            item.setQuantity(itemRequest.getQuantity());
            order.addItem(item);

            subtotal += itemRequest.getUnitPriceCents() * itemRequest.getQuantity();
        }

        order.setSubtotalCents(subtotal);
        order.setShippingCents(0);
        order.setTaxCents(0);
        order.setTotalCents(subtotal);

        return orderRepository.save(order);
    }

    private Address resolveAddressForOrder(User user, CreateOrderRequest request) {
        if (request.getAddressId() != null) {
            return addressRepository.findById(request.getAddressId())
                    .orElseThrow(() -> new ResourceNotFoundException("Address", request.getAddressId()));
        }

        AddressRequest addressRequest = request.getShippingAddress();
        if (addressRequest == null) {
            throw new BadRequestException("addressId or shippingAddress is required");
        }

        if (addressRequest.getLine1() == null || addressRequest.getLine1().isBlank()) {
            throw new BadRequestException("shippingAddress.line1 is required");
        }
        if (addressRequest.getCity() == null || addressRequest.getCity().isBlank()) {
            throw new BadRequestException("shippingAddress.city is required");
        }
        if (addressRequest.getPostalCode() == null || addressRequest.getPostalCode().isBlank()) {
            throw new BadRequestException("shippingAddress.postalCode is required");
        }
        if (addressRequest.getCountryCode() == null || addressRequest.getCountryCode().isBlank()) {
            throw new BadRequestException("shippingAddress.countryCode is required");
        }

        Address address = new Address();
        address.setUser(user);
        address.setFullName(
                (addressRequest.getFullName() != null && !addressRequest.getFullName().isBlank())
                        ? addressRequest.getFullName()
                        : user.getFullName());
        address.setPhone(addressRequest.getPhone());
        address.setLine1(addressRequest.getLine1());
        address.setLine2(addressRequest.getLine2());
        address.setCity(addressRequest.getCity());
        address.setState(addressRequest.getState());
        address.setPostalCode(addressRequest.getPostalCode());
        address.setCountryCode(addressRequest.getCountryCode().trim().toUpperCase());
        address.setDefaultAddress(false);

        return addressRepository.save(address);
    }

    public Order updateStatus(Long id, OrderStatus status) {
        Order order = getById(id);
        order.setStatus(status);
        if (status == OrderStatus.PAID) {
            order.setPaidAt(Instant.now());
        }
        if (status == OrderStatus.SHIPPED) {
            order.setShippedAt(Instant.now());
        }
        return orderRepository.save(order);
    }

    public void delete(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Order", id);
        }
        orderRepository.deleteById(id);
    }
}
