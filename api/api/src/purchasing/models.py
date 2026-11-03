from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import Annotated

from pydantic import BaseModel, Field, PlainSerializer, computed_field

# Amounts are exact Decimals internally but serialize as JSON numbers, matching the Java and TypeScript APIs.
Money = Annotated[Decimal, PlainSerializer(float, return_type=float, when_used="json")]


class OrderStatus(str, Enum):
    PLACED = "PLACED"
    CANCELLED = "CANCELLED"


class Product(BaseModel):
    id: int
    name: str
    category: str
    price: Money
    stock: int


class OrderLine(BaseModel):
    productId: int
    productName: str
    quantity: int
    unitPrice: Money

    @computed_field
    @property
    def lineTotal(self) -> Money:
        return self.unitPrice * self.quantity


class PurchaseOrder(BaseModel):
    id: int
    customerName: str
    lines: list[OrderLine]
    createdAt: datetime
    status: OrderStatus = OrderStatus.PLACED

    @computed_field
    @property
    def total(self) -> Money:
        return sum((line.lineTotal for line in self.lines), Decimal("0"))


class OrderItem(BaseModel):
    productId: int
    quantity: int = Field(ge=1)


class CreateOrderRequest(BaseModel):
    customerName: str = Field(min_length=1)
    items: list[OrderItem] = Field(min_length=1)
