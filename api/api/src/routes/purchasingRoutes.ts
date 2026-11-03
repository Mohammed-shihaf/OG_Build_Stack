import { Router } from "express";
import type { PurchasingService } from "../purchasingService.js";

const parseId = (value: string) => {
  const id = Number(value);
  return Number.isInteger(id) ? id : -1;
};

export function purchasingRoutes(service: PurchasingService): Router {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({ status: "UP" });
  });

  router.get("/products", (_req, res) => {
    res.json(service.listProducts());
  });

  router.get("/products/:id", (req, res) => {
    res.json(service.getProduct(parseId(req.params.id)));
  });

  router.get("/orders", (_req, res) => {
    res.json(service.listOrders());
  });

  router.get("/orders/:id", (req, res) => {
    res.json(service.getOrder(parseId(req.params.id)));
  });

  router.post("/orders", (req, res) => {
    res.status(201).json(service.placeOrder(req.body));
  });

  router.post("/orders/:id/cancel", (req, res) => {
    res.json(service.cancelOrder(parseId(req.params.id)));
  });

  return router;
}
