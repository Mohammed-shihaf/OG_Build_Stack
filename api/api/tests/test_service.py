from decimal import Decimal

import pytest

from purchasing.models import CreateOrderRequest, OrderItem, OrderStatus
from purchasing.service import BadRequestError, NotFoundError, PurchasingService


def order(*items: tuple[int, int]) -> CreateOrderRequest:
    return CreateOrderRequest(customerName="Acme Ltd",
                              items=[OrderItem(productId=p, quantity=q) for p, q in items])


def test_place_order_computes_total_and_reduces_stock():
    service = PurchasingService()

    placed = service.place_order(order((2, 2), (6, 1)))

    assert placed.total == Decimal("53.25")
    assert placed.status == OrderStatus.PLACED
    assert service.get_product(2).stock == 48


def test_place_order_merges_duplicate_lines_before_checking_stock():
    service = PurchasingService()

    with pytest.raises(BadRequestError):
        service.place_order(order((4, 3), (4, 3)))
    assert service.get_product(4).stock == 5


def test_place_order_rejects_unknown_product():
    with pytest.raises(NotFoundError):
        PurchasingService().place_order(order((99, 1)))


def test_cancel_order_restores_stock():
    service = PurchasingService()
    placed = service.place_order(order((1, 3)))

    service.cancel_order(placed.id)

    assert service.get_order(placed.id).status == OrderStatus.CANCELLED
    assert service.get_product(1).stock == 10
    with pytest.raises(BadRequestError):
        service.cancel_order(placed.id)
