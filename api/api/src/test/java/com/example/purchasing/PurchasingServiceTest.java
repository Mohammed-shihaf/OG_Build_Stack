package com.example.purchasing;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.example.purchasing.exception.BadRequestException;
import com.example.purchasing.exception.NotFoundException;
import com.example.purchasing.model.CreateOrderRequest;
import com.example.purchasing.model.OrderStatus;
import com.example.purchasing.model.PurchaseOrder;
import com.example.purchasing.repository.OrderRepository;
import com.example.purchasing.repository.ProductRepository;
import com.example.purchasing.service.PurchasingService;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PurchasingServiceTest {
    private PurchasingService service;

    @BeforeEach
    void setUp() {
        service = new PurchasingService(new ProductRepository(), new OrderRepository());
    }

    @Test
    void placeOrderComputesTotalAndReducesStock() {
        PurchaseOrder order = service.placeOrder(new CreateOrderRequest("Acme Ltd",
                List.of(new CreateOrderRequest.Item(2, 2), new CreateOrderRequest.Item(6, 1))));

        assertThat(order.getTotal()).isEqualByComparingTo(new BigDecimal("53.25"));
        assertThat(order.getStatus()).isEqualTo(OrderStatus.PLACED);
        assertThat(service.getProduct(2).getStock()).isEqualTo(48);
    }

    @Test
    void placeOrderMergesDuplicateLinesBeforeCheckingStock() {
        assertThatThrownBy(() -> service.placeOrder(new CreateOrderRequest("Acme Ltd",
                List.of(new CreateOrderRequest.Item(4, 3), new CreateOrderRequest.Item(4, 3)))))
                .isInstanceOf(BadRequestException.class);
        assertThat(service.getProduct(4).getStock()).isEqualTo(5);
    }

    @Test
    void placeOrderRejectsUnknownProduct() {
        assertThatThrownBy(() -> service.placeOrder(new CreateOrderRequest("Acme Ltd",
                List.of(new CreateOrderRequest.Item(99, 1)))))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void cancelOrderRestoresStock() {
        PurchaseOrder order = service.placeOrder(new CreateOrderRequest("Acme Ltd",
                List.of(new CreateOrderRequest.Item(1, 3))));

        service.cancelOrder(order.getId());

        assertThat(service.getOrder(order.getId()).getStatus()).isEqualTo(OrderStatus.CANCELLED);
        assertThat(service.getProduct(1).getStock()).isEqualTo(10);
        assertThatThrownBy(() -> service.cancelOrder(order.getId())).isInstanceOf(BadRequestException.class);
    }
}
