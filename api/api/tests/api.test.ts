import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("Purchasing API", () => {
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    const uiDir = mkdtempSync(path.join(tmpdir(), "purchasing-ui-"));
    writeFileSync(path.join(uiDir, "index.html"), "<title>Purchasing</title>");
    app = createApp(undefined, uiDir);
  });

  it("lists products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(6);
  });

  it("creates an order", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({ customerName: "Acme Ltd", items: [{ productId: 3, quantity: 2 }] });
    expect(response.status).toBe(201);
    expect(response.body.total).toBe(298);
    expect(response.body.lines[0].productName).toBe("Office Chair");
  });

  it("rejects an empty order", async () => {
    const response = await request(app).post("/api/orders").send({ customerName: "", items: [] });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  it("rejects malformed JSON", async () => {
    const response = await request(app).post("/api/orders").set("Content-Type", "application/json").send("{");
    expect(response.status).toBe(400);
  });

  it("returns 404 for an unknown order", async () => {
    expect((await request(app).get("/api/orders/999")).status).toBe(404);
  });

  it("cancels an order", async () => {
    const created = await request(app).post("/api/orders").send({ customerName: "Acme", items: [{ productId: 1, quantity: 1 }] });
    const response = await request(app).post(`/api/orders/${created.body.id}/cancel`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("CANCELLED");
  });

  it("serves the web UI for non-API routes", async () => {
    const response = await request(app).get("/orders");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Purchasing");
  });
});
