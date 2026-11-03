package com.example.purchasing.controller;

import com.example.purchasing.model.Product;
import com.example.purchasing.service.PurchasingService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final PurchasingService service;

    public ProductController(PurchasingService service) {
        this.service = service;
    }

    @GetMapping
    public List<Product> list() {
        return service.listProducts();
    }

    @GetMapping("/{id}")
    public Product get(@PathVariable long id) {
        return service.getProduct(id);
    }
}
