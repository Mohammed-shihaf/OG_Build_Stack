# Purchasing — Java

A purchase order management app: browse products, build an order, place it, and cancel it
(cancelling puts the stock back). One Spring Boot service serves both the REST API and the web UI.

- **Backend:** Spring Boot 3.5, Java 21, Maven
- **Frontend:** static HTML/JS in `api/api/src/main/resources/static/`, served by the backend
- **Storage:** in memory, seeded with sample products (restarting the app resets it)

## Layout

```
api/
├── pom.xml                         # aggregator POM (lists the modules)
└── api/                            # the application module
    ├── pom.xml
    ├── api.http                    # sample requests
    └── src/
        ├── main/java/com/example/purchasing/
        │   ├── controller/         # REST endpoints
        │   ├── service/            # ordering rules (stock checks, totals, cancel)
        │   ├── repository/         # in-memory stores
        │   ├── model/
        │   └── exception/          # error -> HTTP status mapping
        ├── main/resources/static/  # web UI
        └── test/java/...           # unit + MockMvc tests
```

## Requirements

JDK 21 and Maven 3.9+.

## Build

```bash
mvn -f api/pom.xml clean package
```

Output: `api/api/target/purchasing-api.jar`. Tests run as part of the build; JaCoCo writes
coverage to `api/api/target/site/jacoco/`.

## Test

```bash
mvn -f api/pom.xml test
```

## Run

```bash
java -jar api/api/target/purchasing-api.jar
```

- Web UI: http://localhost:5125/
- API: http://localhost:5125/api/products
- Health: http://localhost:5125/actuator/health

Set `PORT` to use another port.

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
