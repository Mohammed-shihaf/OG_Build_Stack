import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, vi } from "vitest";
import App from "./App";
import type { Product, PurchaseOrder } from "./types";

const products: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 899.99, stock: 10 },
  { id: 2, name: "Wireless Mouse", category: "Electronics", price: 24.5, stock: 50 },
];

let orders: PurchaseOrder[];

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }));

beforeEach(() => {
  orders = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string, init?: RequestInit) => {
      if (url === "/api/products") return json(products);
      if (url === "/api/orders" && init?.method === "POST") {
        const body = JSON.parse(String(init.body));
        const order: PurchaseOrder = {
          id: 1,
          customerName: body.customerName,
          lines: [{ productId: 2, productName: "Wireless Mouse", quantity: 2, unitPrice: 24.5, lineTotal: 49 }],
          total: 49,
          status: "PLACED",
          createdAt: new Date().toISOString(),
        };
        orders = [order];
        return json(order, 201);
      }
      if (url === "/api/orders") return json(orders);
      return json({ error: "not found" }, 404);
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test("shows the product catalog", async () => {
  render(<App />);
  expect(await screen.findByText("Laptop")).toBeInTheDocument();
  expect(screen.getByText("No orders yet.")).toBeInTheDocument();
});

test("places an order from the cart", async () => {
  const user = userEvent.setup();
  render(<App />);

  const quantity = await screen.findByLabelText("Quantity of Wireless Mouse");
  await user.clear(quantity);
  await user.type(quantity, "2");
  await user.click(screen.getAllByRole("button", { name: "Add" })[1]);
  expect(screen.getByText("$49.00", { selector: "strong" })).toBeInTheDocument();

  await user.type(screen.getByLabelText("Customer name"), "Acme Ltd");
  await user.click(screen.getByRole("button", { name: "Place order" }));

  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Order #1 placed — $49.00"));
  expect(screen.getByText("Acme Ltd")).toBeInTheDocument();
});
