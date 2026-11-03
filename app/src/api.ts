import type { Product, PurchaseOrder } from "./types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error ?? `Request failed (${response.status})`);
  }
  return body as T;
}

export const api = {
  listProducts: () => request<Product[]>("/products"),
  listOrders: () => request<PurchaseOrder[]>("/orders"),
  placeOrder: (customerName: string, items: { productId: number; quantity: number }[]) =>
    request<PurchaseOrder>("/orders", { method: "POST", body: JSON.stringify({ customerName, items }) }),
  cancelOrder: (id: number) => request<PurchaseOrder>(`/orders/${id}/cancel`, { method: "POST" }),
};

export const money = (value: number) => `$${value.toFixed(2)}`;
