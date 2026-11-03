package com.example.purchasing.repository;

import com.example.purchasing.model.Product;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;

@Repository
public class ProductRepository {
    private final Map<Long, Product> products = new ConcurrentHashMap<>();

    public ProductRepository() {
        save(new Product(1, "Laptop", "Electronics", new BigDecimal("899.99"), 10));
        save(new Product(2, "Wireless Mouse", "Electronics", new BigDecimal("24.50"), 50));
        save(new Product(3, "Office Chair", "Furniture", new BigDecimal("149.00"), 15));
        save(new Product(4, "Standing Desk", "Furniture", new BigDecimal("399.00"), 5));
        save(new Product(5, "Printer Paper (500 sheets)", "Supplies", new BigDecimal("6.99"), 200));
        save(new Product(6, "Ballpoint Pens (12 pack)", "Supplies", new BigDecimal("4.25"), 120));
    }

    public List<Product> findAll() {
        return products.values().stream().sorted(Comparator.comparingLong(Product::getId)).toList();
    }

    public Optional<Product> findById(long id) {
        return Optional.ofNullable(products.get(id));
    }

    public void save(Product product) {
        products.put(product.getId(), product);
    }
}
