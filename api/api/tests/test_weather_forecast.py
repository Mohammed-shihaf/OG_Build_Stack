from fastapi.testclient import TestClient

from api.main import app

client = TestClient(app)


def test_returns_five_forecasts():
    response = client.get("/weatherforecast")
    assert response.status_code == 200
    assert len(response.json()) == 5
