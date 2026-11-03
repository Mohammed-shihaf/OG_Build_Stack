# Purchasing — Python

A purchase order management app: browse products, build an order, place it, and cancel it
(cancelling puts the stock back). One FastAPI service serves both the REST API and the web UI.

- **Backend:** FastAPI on Python 3.11+, packaged with setuptools (`pyproject.toml`)
- **Frontend:** static HTML/JS in `api/api/src/purchasing/static/`, served by the backend
- **Storage:** in memory, seeded with sample products (restarting the app resets it)

## Layout

```
api/
└── api/
    ├── pyproject.toml          # package metadata, dependencies, `purchasing-api` entry point
    ├── requirements.txt        # pinned ranges for a plain pip install (runtime + test)
    ├── api.http                # sample requests
    ├── src/purchasing/
    │   ├── main.py             # FastAPI app, routes, error mapping, static UI mount
    │   ├── service.py          # ordering rules (stock checks, totals, cancel)
    │   ├── models.py           # Pydantic models
    │   └── static/             # web UI
    └── tests/                  # service + API tests
```

## Requirements

Python 3.11 or newer. Run every command below from `api/api/`.

## Install

```bash
pip install -r requirements.txt
```
```bash
pip install -e .
```

## Build (wheel + sdist into `dist/`)

```bash
pip install build
```
```bash
python -m build
```

## Test

```bash
pytest --cov=purchasing
```

## Run

```bash
purchasing-api
```

(or `uvicorn purchasing.main:app --port 5125`)

- Web UI: http://localhost:5125/
- API: http://localhost:5125/api/products
- Interactive API docs: http://localhost:5125/docs
- Health: http://localhost:5125/api/health

Set `PORT` / `HOST` to change where it listens.

## API

| Method | Path | Description |
|---|---|---|
| GET | `/api/products` | List products with price and stock |
| GET | `/api/products/{id}` | One product |
| GET | `/api/orders` | List orders, newest first |
| GET | `/api/orders/{id}` | One order |
| POST | `/api/orders` | Place an order: `{"customerName": "...", "items": [{"productId": 1, "quantity": 2}]}` |
| POST | `/api/orders/{id}/cancel` | Cancel an order and restore stock |

Errors return `{"error": "..."}` with 400 (invalid order, not enough stock) or 404 (unknown id).
