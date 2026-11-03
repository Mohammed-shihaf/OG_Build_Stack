from datetime import datetime, timezone
from decimal import Decimal
from itertools import count
from threading import Lock

from purchasing.models import CreateOrderRequest, OrderLine, OrderStatus, Product, PurchaseOrder


class NotFoundError(Exception):
    pass


class BadRequestError(Exception):
    pass


def seed_products() -> dict[int, Product]:
    products = [
        Product(id=1, name="Laptop", category="Electronics", price=Decimal("899.99"), stock=10),
        Product(id=2, name="Wireless Mouse", category="Electronics", price=Decimal("24.50"), stock=50),
        Product(id=3, name="Office Chair", category="Furniture", price=Decimal("149.00"), stock=15),
        Product(id=4, name="Standing Desk", category="Furniture", price=Decimal("399.00"), stock=5),
        Product(id=5, name="Printer Paper (500 sheets)", category="Supplies", price=Decimal("6.99"), stock=200),
        Product(id=6, name="Ballpoint Pens (12 pack)", category="Supplies", price=Decimal("4.25"), stock=120),
    ]
    return {product.id: product for product in products}


class PurchasingService:
    def __init__(self) -> None:
        self._products = seed_products()
        self._orders: dict[int, PurchaseOrder] = {}
        self._ids = count(1)
        self._lock = Lock()

    def list_products(self) -> list[Product]:
        return sorted(self._products.values(), key=lambda p: p.id)

    def get_product(self, product_id: int) -> Product:
        product = self._products.get(product_id)
        if product is None:
            raise NotFoundError(f"Product {product_id} not found")
        return product

    def list_orders(self) -> list[PurchaseOrder]:
        return sorted(self._orders.values(), key=lambda o: o.id, reverse=True)

    def get_order(self, order_id: int) -> PurchaseOrder:
        order = self._orders.get(order_id)
        if order is None:
            raise NotFoundError(f"Order {order_id} not found")
        return order

    def place_order(self, request: CreateOrderRequest) -> PurchaseOrder:
        customer_name = request.customerName.strip()
        if not customer_name:
            raise BadRequestError("Customer name is required")

        requested: dict[int, int] = {}
        for item in request.items:
            requested[item.productId] = requested.get(item.productId, 0) + item.quantity

        with self._lock:
            lines = []
            for product_id, quantity in requested.items():
                product = self.get_product(product_id)
                if quantity > product.stock:
                    raise BadRequestError(f"Only {product.stock} of {product.name} in stock")
                lines.append(OrderLine(productId=product.id, productName=product.name,
                                       quantity=quantity, unitPrice=product.price))

            for line in lines:
                self.get_product(line.productId).stock -= line.quantity

            order = PurchaseOrder(id=next(self._ids), customerName=customer_name, lines=lines,
                                  createdAt=datetime.now(timezone.utc))
            self._orders[order.id] = order
            return order

    def cancel_order(self, order_id: int) -> PurchaseOrder:
        with self._lock:
            order = self.get_order(order_id)
            if order.status == OrderStatus.CANCELLED:
                raise BadRequestError(f"Order {order_id} is already cancelled")
            for line in order.lines:
                self.get_product(line.productId).stock += line.quantity
            order.status = OrderStatus.CANCELLED
            return order
