package com.example.purchasing.controller;

import com.example.purchasing.model.CreateOrderRequest;
import com.example.purchasing.model.PurchaseOrder;
import com.example.purchasing.service.PurchasingService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final PurchasingService service;

    public OrderController(PurchasingService service) {
        this.service = service;
    }

    @GetMapping
    public List<PurchaseOrder> list() {
        return service.listOrders();
    }

    @GetMapping("/{id}")
    public PurchaseOrder get(@PathVariable long id) {
        return service.getOrder(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PurchaseOrder create(@Valid @RequestBody CreateOrderRequest request) {
        return service.placeOrder(request);
    }

    @PostMapping("/{id}/cancel")
    public PurchaseOrder cancel(@PathVariable long id) {
        return service.cancelOrder(id);
    }
}
