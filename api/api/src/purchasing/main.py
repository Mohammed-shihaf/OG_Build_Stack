import os
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from purchasing.models import CreateOrderRequest, Product, PurchaseOrder
from purchasing.service import BadRequestError, NotFoundError, PurchasingService

STATIC_DIR = Path(__file__).parent / "static"


def create_app() -> FastAPI:
    app = FastAPI(title="Purchasing API", version="1.0.0")
    service = PurchasingService()

    @app.exception_handler(NotFoundError)
    async def not_found(_: Request, exc: NotFoundError) -> JSONResponse:
        return JSONResponse(status_code=404, content={"error": str(exc)})

    @app.exception_handler(BadRequestError)
    async def bad_request(_: Request, exc: BadRequestError) -> JSONResponse:
        return JSONResponse(status_code=400, content={"error": str(exc)})

    @app.exception_handler(RequestValidationError)
    async def invalid(_: Request, __: RequestValidationError) -> JSONResponse:
        return JSONResponse(
            status_code=400,
            content={"error": "Customer name and at least one item with quantity of 1 or more are required"},
        )

    @app.get("/api/health")
    def health() -> dict[str, str]:
        return {"status": "UP"}

    @app.get("/api/products")
    def list_products() -> list[Product]:
        return service.list_products()

    @app.get("/api/products/{product_id}")
    def get_product(product_id: int) -> Product:
        return service.get_product(product_id)

    @app.get("/api/orders")
    def list_orders() -> list[PurchaseOrder]:
        return service.list_orders()

    @app.get("/api/orders/{order_id}")
    def get_order(order_id: int) -> PurchaseOrder:
        return service.get_order(order_id)

    @app.post("/api/orders", status_code=201)
    def create_order(request: CreateOrderRequest) -> PurchaseOrder:
        return service.place_order(request)

    @app.post("/api/orders/{order_id}/cancel")
    def cancel_order(order_id: int) -> PurchaseOrder:
        return service.cancel_order(order_id)

    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="ui")
    return app


app = create_app()


def run() -> None:
    import uvicorn

    uvicorn.run(app, host=os.environ.get("HOST", "127.0.0.1"), port=int(os.environ.get("PORT", "5125")))


if __name__ == "__main__":
    run()
