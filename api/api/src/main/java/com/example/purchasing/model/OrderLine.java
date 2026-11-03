package com.example.purchasing.model;

import java.math.BigDecimal;

public record OrderLine(long productId, String productName, int quantity, BigDecimal unitPrice) {
    public BigDecimal getLineTotal() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }
}
