import { money } from "../api";
import type { PurchaseOrder } from "../types";

interface Props {
  orders: PurchaseOrder[];
  onCancel: (id: number) => void;
}

export function OrdersTable({ orders, onCancel }: Props) {
  if (orders.length === 0) {
    return <p className="muted">No orders yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Items</th>
          <th className="num">Total</th>
          <th>Status</th>
          <th>Created</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customerName}</td>
            <td>{order.lines.map((line) => `${line.quantity} × ${line.productName}`).join(", ")}</td>
            <td className="num">{money(order.total)}</td>
            <td>
              <span className={`status ${order.status}`}>{order.status}</span>
            </td>
            <td>{new Date(order.createdAt).toLocaleString()}</td>
            <td>
              {order.status === "PLACED" && (
                <button className="danger" onClick={() => onCancel(order.id)}>
                  Cancel
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
