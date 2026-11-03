import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { api, money } from "./api";
import { OrderForm } from "./components/OrderForm";
import { OrdersTable } from "./components/OrdersTable";
import { ProductTable } from "./components/ProductTable";
import type { Product, PurchaseOrder } from "./types";

type Message = { text: string; kind: "ok" | "error" } | null;

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [cart, setCart] = useState<Map<number, number>>(new Map());
  const [message, setMessage] = useState<Message>(null);

  const refresh = useCallback(async () => {
    const [productList, orderList] = await Promise.all([api.listProducts(), api.listOrders()]);
    setProducts(productList);
    setOrders(orderList);
  }, []);

  useEffect(() => {
    refresh().catch((error: Error) => setMessage({ text: error.message, kind: "error" }));
  }, [refresh]);

  function addToCart(product: Product, quantity: number) {
    setCart((current) => new Map(current).set(product.id, (current.get(product.id) ?? 0) + quantity));
    setMessage(null);
  }

  function removeFromCart(productId: number) {
    setCart((current) => {
      const next = new Map(current);
      next.delete(productId);
      return next;
    });
  }

  async function placeOrder(customerName: string) {
    try {
      const items = [...cart].map(([productId, quantity]) => ({ productId, quantity }));
      const order = await api.placeOrder(customerName, items);
      setCart(new Map());
      setMessage({ text: `Order #${order.id} placed — ${money(order.total)}`, kind: "ok" });
      await refresh();
      return true;
    } catch (error) {
      setMessage({ text: (error as Error).message, kind: "error" });
      return false;
    }
  }

  async function cancelOrder(id: number) {
    try {
      await api.cancelOrder(id);
      setMessage({ text: `Order #${id} cancelled`, kind: "ok" });
      await refresh();
    } catch (error) {
      setMessage({ text: (error as Error).message, kind: "error" });
    }
  }

  return (
    <>
      <header className="topbar">
        <h1>Purchasing</h1>
        <span className="subtitle">Create and track purchase orders</span>
      </header>
      <main className="layout">
        <section className="panel">
          <h2>Products</h2>
          <ProductTable products={products} onAdd={addToCart} />
        </section>
        <section className="panel">
          <h2>New purchase order</h2>
          <OrderForm cart={cart} products={products} onRemove={removeFromCart} onSubmit={placeOrder} />
          <p className={`message ${message?.kind ?? ""}`} role="status">
            {message?.text}
          </p>
        </section>
        <section className="panel wide">
          <h2>Orders</h2>
          <OrdersTable orders={orders} onCancel={cancelOrder} />
        </section>
      </main>
    </>
  );
}

export default App;
