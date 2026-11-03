package com.example.purchasing.model;

import java.math.BigDecimal;

public class Product {
    private final long id;
    private final String name;
    private final String category;
    private final BigDecimal price;
    private int stock;

    public Product(long id, String name, String category, BigDecimal price, int stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }

    public long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public BigDecimal getPrice() { return price; }
    public int getStock() { return stock; }

    public void setStock(int stock) { this.stock = stock; }
}
