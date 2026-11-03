import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("GET /weatherforecast", () => {
  it("returns five forecasts", async () => {
    const response = await request(app).get("/weatherforecast");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
  });
});
