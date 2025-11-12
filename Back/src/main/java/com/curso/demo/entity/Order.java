package com.curso.demo.entity;

import com.curso.demo.entity.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "orders", indexes = {
        @Index(name = "idx_orders_created", columnList = "createdAt"),
        @Index(name = "idx_orders_user", columnList = "user_id")
})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    // Dueño del pedido
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties(value = {"addresses", "orders"}, allowSetters = true)
    private User user;

    // Dirección de envío para el pedido
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", nullable = false)
    @JsonIgnoreProperties(value = {"user"}, allowSetters = true)
    private Address address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(nullable = false)
    private Integer subtotalCents;

    @Column(nullable = false)
    private Integer shippingCents;

    @Column(nullable = false)
    private Integer taxCents;

    @Column(nullable = false)
    private Integer totalCents;

    @Column(nullable = false, length = 3)
    private String currency = "USD";

    @Column(nullable = false, updatable = false)
    @Setter(AccessLevel.NONE)
    private Instant createdAt;

    private Instant paidAt;
    private Instant shippedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"order"}, allowSetters = true)
    @Setter(AccessLevel.NONE)
    private List<OrderItem> items = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }

    public void removeItem(OrderItem item) {
        items.remove(item);
        item.setOrder(null);
    }
}
