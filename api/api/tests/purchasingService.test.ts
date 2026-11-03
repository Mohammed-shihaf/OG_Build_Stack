import { describe, expect, it } from "vitest";
import { BadRequestError, NotFoundError, PurchasingService } from "../src/purchasingService.js";

const order = (...items: [number, number][]) => ({
  customerName: "Acme Ltd",
  items: items.map(([productId, quantity]) => ({ productId, quantity })),
});

describe("PurchasingService", () => {
  it("computes the total and reduces stock", () => {
    const service = new PurchasingService();

    const placed = service.placeOrder(order([2, 2], [6, 1]));

    expect(placed.total).toBe(53.25);
    expect(placed.status).toBe("PLACED");
    expect(service.getProduct(2).stock).toBe(48);
  });

  it("merges duplicate lines before checking stock", () => {
    const service = new PurchasingService();

    expect(() => service.placeOrder(order([4, 3], [4, 3]))).toThrow(BadRequestError);
    expect(service.getProduct(4).stock).toBe(5);
  });

  it("rejects unknown products and invalid requests", () => {
    const service = new PurchasingService();

    expect(() => service.placeOrder(order([99, 1]))).toThrow(NotFoundError);
    expect(() => service.placeOrder({ customerName: " ", items: [] })).toThrow(BadRequestError);
    expect(() => service.placeOrder(order([1, 0]))).toThrow(BadRequestError);
  });

  it("cancels an order and restores stock once", () => {
    const service = new PurchasingService();
    const placed = service.placeOrder(order([1, 3]));

    service.cancelOrder(placed.id);

    expect(service.getOrder(placed.id).status).toBe("CANCELLED");
    expect(service.getProduct(1).stock).toBe(10);
    expect(() => service.cancelOrder(placed.id)).toThrow(BadRequestError);
  });
});
