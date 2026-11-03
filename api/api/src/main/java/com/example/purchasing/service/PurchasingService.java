package com.example.purchasing.service;

import com.example.purchasing.exception.BadRequestException;
import com.example.purchasing.exception.NotFoundException;
import com.example.purchasing.model.CreateOrderRequest;
import com.example.purchasing.model.OrderLine;
import com.example.purchasing.model.OrderStatus;
import com.example.purchasing.model.Product;
import com.example.purchasing.model.PurchaseOrder;
import com.example.purchasing.repository.OrderRepository;
import com.example.purchasing.repository.ProductRepository;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class PurchasingService {
    private final ProductRepository products;
    private final OrderRepository orders;

    public PurchasingService(ProductRepository products, OrderRepository orders) {
        this.products = products;
        this.orders = orders;
    }

    public List<Product> listProducts() {
        return products.findAll();
    }

    public Product getProduct(long id) {
        return products.findById(id).orElseThrow(() -> new NotFoundException("Product " + id + " not found"));
    }

    public List<PurchaseOrder> listOrders() {
        return orders.findAll();
    }

    public PurchaseOrder getOrder(long id) {
        return orders.findById(id).orElseThrow(() -> new NotFoundException("Order " + id + " not found"));
    }

    public synchronized PurchaseOrder placeOrder(CreateOrderRequest request) {
        Map<Long, Integer> requested = new HashMap<>();
        for (CreateOrderRequest.Item item : request.items()) {
            requested.merge(item.productId(), item.quantity(), Integer::sum);
        }

        List<OrderLine> lines = new ArrayList<>();
        for (Map.Entry<Long, Integer> entry : requested.entrySet()) {
            Product product = getProduct(entry.getKey());
            if (entry.getValue() > product.getStock()) {
                throw new BadRequestException("Only " + product.getStock() + " of " + product.getName() + " in stock");
            }
            lines.add(new OrderLine(product.getId(), product.getName(), entry.getValue(), product.getPrice()));
        }

        for (OrderLine line : lines) {
            Product product = getProduct(line.productId());
            product.setStock(product.getStock() - line.quantity());
        }
        PurchaseOrder order = new PurchaseOrder(orders.nextId(), request.customerName().trim(), lines, Instant.now());
        orders.save(order);
        return order;
    }

    public synchronized PurchaseOrder cancelOrder(long id) {
        PurchaseOrder order = getOrder(id);
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order " + id + " is already cancelled");
        }
        for (OrderLine line : order.getLines()) {
            Product product = getProduct(line.productId());
            product.setStock(product.getStock() + line.quantity());
        }
        order.setStatus(OrderStatus.CANCELLED);
        return order;
    }
}
