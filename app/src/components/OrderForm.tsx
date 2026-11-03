import { useState, type FormEvent } from "react";
import { money } from "../api";
import type { Product } from "../types";

interface Props {
  cart: Map<number, number>;
  products: Product[];
  onRemove: (productId: number) => void;
  onSubmit: (customerName: string) => Promise<boolean>;
}

export function OrderForm({ cart, products, onRemove, onSubmit }: Props) {
  const [customerName, setCustomerName] = useState("");
  const lines = [...cart].flatMap(([productId, quantity]) => {
    const product = products.find((p) => p.id === productId);
    return product ? [{ product, quantity }] : [];
  });
  const total = lines.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (await onSubmit(customerName.trim())) {
      setCustomerName("");
    }
  }

  return (
    <>
      {lines.length === 0 ? (
        <p className="muted">Add products to start an order.</p>
      ) : (
        <ul className="cart">
          {lines.map(({ product, quantity }) => (
            <li key={product.id}>
              <span>
                {quantity} × {product.name}
              </span>
              <span>
                {money(product.price * quantity)}{" "}
                <button className="danger" aria-label={`Remove ${product.name}`} onClick={() => onRemove(product.id)}>
                  ×
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
      <p className="total">
        Total: <strong>{money(total)}</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="customer">Customer name</label>
        <input
          id="customer"
          required
          placeholder="e.g. Acme Ltd"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
        />
        <button type="submit" disabled={lines.length === 0}>
          Place order
        </button>
      </form>
    </>
  );
}
