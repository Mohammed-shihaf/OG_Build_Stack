from datetime import datetime
from decimal import Decimal
from enum import Enum

from pydantic import BaseModel, Field, computed_field


class OrderStatus(str, Enum):
    PLACED = "PLACED"
    CANCELLED = "CANCELLED"


class Product(BaseModel):
    id: int
    name: str
    category: str
    price: Decimal
    stock: int


class OrderLine(BaseModel):
    productId: int
    productName: str
    quantity: int
    unitPrice: Decimal

    @computed_field
    @property
    def lineTotal(self) -> Decimal:
        return self.unitPrice * self.quantity


class PurchaseOrder(BaseModel):
    id: int
    customerName: str
    lines: list[OrderLine]
    createdAt: datetime
    status: OrderStatus = OrderStatus.PLACED

    @computed_field
    @property
    def total(self) -> Decimal:
        return sum((line.lineTotal for line in self.lines), Decimal("0"))


class OrderItem(BaseModel):
    productId: int
    quantity: int = Field(ge=1)


class CreateOrderRequest(BaseModel):
    customerName: str = Field(min_length=1)
    items: list[OrderItem] = Field(min_length=1)
