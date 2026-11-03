import { useState } from "react";
import { money } from "../api";
import type { Product } from "../types";

interface Props {
  products: Product[];
  onAdd: (product: Product, quantity: number) => void;
}

function ProductRow({ product, onAdd }: { product: Product; onAdd: Props["onAdd"] }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td className="num">{money(product.price)}</td>
      <td className="num">{product.stock}</td>
      <td className="num">
        <input
          className="qty"
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          aria-label={`Quantity of ${product.name}`}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
      </td>
      <td>
        <button
          className="secondary"
          disabled={product.stock === 0 || !Number.isInteger(quantity) || quantity < 1}
          onClick={() => onAdd(product, quantity)}
        >
          Add
        </button>
      </td>
    </tr>
  );
}

export function ProductTable({ products, onAdd }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th className="num">Price</th>
          <th className="num">In stock</th>
          <th className="num">Qty</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} onAdd={onAdd} />
        ))}
      </tbody>
    </table>
  );
}
