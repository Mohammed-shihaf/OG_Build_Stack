package com.example.purchasing.repository;

import com.example.purchasing.model.PurchaseOrder;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.stereotype.Repository;

@Repository
public class OrderRepository {
    private final Map<Long, PurchaseOrder> orders = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong();

    public long nextId() {
        return sequence.incrementAndGet();
    }

    public List<PurchaseOrder> findAll() {
        return orders.values().stream().sorted(Comparator.comparingLong(PurchaseOrder::getId).reversed()).toList();
    }

    public Optional<PurchaseOrder> findById(long id) {
        return Optional.ofNullable(orders.get(id));
    }

    public void save(PurchaseOrder order) {
        orders.put(order.getId(), order);
    }
}
