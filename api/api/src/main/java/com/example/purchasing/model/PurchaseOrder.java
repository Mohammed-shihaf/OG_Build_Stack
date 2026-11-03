package com.example.purchasing.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public class PurchaseOrder {
    private final long id;
    private final String customerName;
    private final List<OrderLine> lines;
    private final Instant createdAt;
    private OrderStatus status;

    public PurchaseOrder(long id, String customerName, List<OrderLine> lines, Instant createdAt) {
        this.id = id;
        this.customerName = customerName;
        this.lines = List.copyOf(lines);
        this.createdAt = createdAt;
        this.status = OrderStatus.PLACED;
    }

    public long getId() { return id; }
    public String getCustomerName() { return customerName; }
    public List<OrderLine> getLines() { return lines; }
    public Instant getCreatedAt() { return createdAt; }
    public OrderStatus getStatus() { return status; }

    public BigDecimal getTotal() {
        return lines.stream().map(OrderLine::getLineTotal).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void setStatus(OrderStatus status) { this.status = status; }
}
