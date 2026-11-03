# Purchasing — TypeScript

A purchase order management app: browse products, build an order, place it, and cancel it
(cancelling puts the stock back).

- **Backend:** Express 5 + TypeScript in `api/api/`
- **Frontend:** React 19 + TypeScript, built with Vite, in `app/`
- **Storage:** in memory, seeded with sample products (restarting the API resets it)

In production the API also serves the built UI, so one process gives you both.

## Layout

```
package.json            # root convenience scripts (install:all, build, test, start)
api/
└── api/                # backend
    ├── src/
    │   ├── index.ts            # starts the server (PORT, default 5125)
    │   ├── app.ts              # Express app, error mapping, serves app/build
    │   ├── routes/             # REST endpoints
    │   ├── purchasingService.ts# ordering rules (stock checks, totals, cancel)
    │   └── models.ts
    ├── tests/                  # service + HTTP tests (vitest + supertest)
    └── api.http                # sample requests
app/                    # frontend
├── src/
│   ├── App.tsx
│   ├── api.ts                  # fetch client
│   └── components/             # ProductTable, OrderForm, OrdersTable
└── vite.config.ts              # dev server on 3000, proxies /api to 5125
```

## Requirements

Node.js 20.19+ (CI uses Node 24, see `.nvmrc`).

## Install, build, test, run (whole project)

```bash
npm run install:all
```
```bash
npm run build
```
```bash
npm test
```
```bash
npm start
```

Then open http://localhost:5125/ (UI) or http://localhost:5125/api/products (API).

## Each part on its own

Backend (`api/api/`):

```bash
npm ci
```
```bash
npm run build
```
```bash
npm test
```
```bash
npm start
```

Frontend (`app/`):

```bash
npm ci
```
```bash
npm run build
```
```bash
npm test
```

During development run the API (`npm run dev` in `api/api/`) and the UI dev server
(`npm start` in `app/`) together, then open http://localhost:3000/ — Vite proxies `/api` to the API.

Coverage: `npm run test:coverage` in either folder.

## API

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products with price and stock |
| GET | `/api/products/{id}` | One product |
| GET | `/api/orders` | List orders, newest first |
| GET | `/api/orders/{id}` | One order |
| POST | `/api/orders` | Place an order: `{"customerName": "...", "items": [{"productId": 1, "quantity": 2}]}` |
| POST | `/api/orders/{id}/cancel` | Cancel an order and restore stock |

Errors return `{"error": "..."}` with 400 (invalid order, not enough stock) or 404 (unknown id).
