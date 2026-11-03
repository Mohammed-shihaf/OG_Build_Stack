import pytest
from fastapi.testclient import TestClient

from purchasing.main import create_app


@pytest.fixture
def client() -> TestClient:
    return TestClient(create_app())


def test_lists_products(client):
    response = client.get("/api/products")
    assert response.status_code == 200
    assert len(response.json()) == 6
    assert response.json()[0]["price"] == 899.99


def test_creates_order(client):
    response = client.post("/api/orders", json={"customerName": "Acme Ltd", "items": [{"productId": 3, "quantity": 2}]})
    assert response.status_code == 201
    body = response.json()
    assert body["total"] == 298.0
    assert body["lines"][0]["unitPrice"] == 149.0
    assert body["status"] == "PLACED"
    assert body["lines"][0]["productName"] == "Office Chair"


def test_rejects_empty_order(client):
    response = client.post("/api/orders", json={"customerName": "", "items": []})
    assert response.status_code == 400
    assert "error" in response.json()


def test_rejects_quantity_above_stock(client):
    response = client.post("/api/orders", json={"customerName": "Acme", "items": [{"productId": 4, "quantity": 6}]})
    assert response.status_code == 400


def test_returns_not_found_for_unknown_order(client):
    assert client.get("/api/orders/999").status_code == 404


def test_cancels_order(client):
    created = client.post("/api/orders", json={"customerName": "Acme", "items": [{"productId": 1, "quantity": 1}]}).json()
    response = client.post(f"/api/orders/{created['id']}/cancel")
    assert response.status_code == 200
    assert response.json()["status"] == "CANCELLED"


def test_serves_web_ui(client):
    response = client.get("/")
    assert response.status_code == 200
    assert "Purchasing" in response.text
