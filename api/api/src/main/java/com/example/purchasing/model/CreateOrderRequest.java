package com.example.purchasing.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record CreateOrderRequest(
        @NotBlank String customerName,
        @NotEmpty List<@Valid Item> items) {

    public record Item(long productId, @Min(1) int quantity) {
    }
}
