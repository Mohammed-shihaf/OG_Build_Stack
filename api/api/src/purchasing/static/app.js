const cart = new Map();
let products = [];

const money = (value) => `$${Number(value).toFixed(2)}`;
const esc = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || body.detail || `Request failed (${response.status})`);
  }
  return body;
}

function showMessage(text, kind) {
  const el = document.getElementById("message");
  el.textContent = text;
  el.className = `message ${kind || ""}`;
}

function renderProducts() {
  const tbody = document.getElementById("products");
  tbody.innerHTML = "";
  for (const product of products) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${esc(product.name)}</td>
      <td>${esc(product.category)}</td>
      <td class="num">${money(product.price)}</td>
      <td class="num">${product.stock}</td>
      <td class="num"><input class="qty" type="number" min="1" max="${product.stock}" value="1" aria-label="Quantity of ${esc(product.name)}"></td>
      <td><button class="secondary" ${product.stock === 0 ? "disabled" : ""}>Add</button></td>`;
    row.querySelector("button").addEventListener("click", () => {
      const quantity = Number(row.querySelector("input").value);
      if (!Number.isInteger(quantity) || quantity < 1) {
        showMessage("Quantity must be a whole number of 1 or more", "error");
        return;
      }
      cart.set(product.id, (cart.get(product.id) || 0) + quantity);
      showMessage("", "");
      renderCart();
    });
    tbody.appendChild(row);
  }
}

function renderCart() {
  const list = document.getElementById("cart");
  list.innerHTML = "";
  let total = 0;
  for (const [productId, quantity] of cart) {
    const product = products.find((p) => p.id === productId);
    if (!product) continue;
    total += product.price * quantity;
    const item = document.createElement("li");
    item.innerHTML = `<span>${quantity} × ${esc(product.name)}</span><span>${money(product.price * quantity)} <button class="danger" aria-label="Remove ${esc(product.name)}">×</button></span>`;
    item.querySelector("button").addEventListener("click", () => {
      cart.delete(productId);
      renderCart();
    });
    list.appendChild(item);
  }
  document.getElementById("cart-empty").hidden = cart.size > 0;
  document.getElementById("cart-total").textContent = money(total);
  document.getElementById("place-order").disabled = cart.size === 0;
}

function renderOrders(orders) {
  const tbody = document.getElementById("orders");
  tbody.innerHTML = "";
  for (const order of orders) {
    const lines = order.lines.map((l) => `${l.quantity} × ${esc(l.productName)}`).join(", ");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${esc(order.customerName)}</td>
      <td>${lines}</td>
      <td class="num">${money(order.total)}</td>
      <td><span class="status ${esc(order.status)}">${esc(order.status)}</span></td>
      <td>${new Date(order.createdAt).toLocaleString()}</td>
      <td>${order.status === "PLACED" ? '<button class="danger">Cancel</button>' : ""}</td>`;
    const cancel = row.querySelector("button");
    if (cancel) {
      cancel.addEventListener("click", async () => {
        try {
          await api(`/orders/${order.id}/cancel`, { method: "POST" });
          showMessage(`Order #${order.id} cancelled`, "ok");
          await refresh();
        } catch (error) {
          showMessage(error.message, "error");
        }
      });
    }
    tbody.appendChild(row);
  }
  document.getElementById("orders-empty").hidden = orders.length > 0;
}

async function refresh() {
  const [productList, orders] = await Promise.all([api("/products"), api("/orders")]);
  products = productList;
  renderProducts();
  renderCart();
  renderOrders(orders);
}

document.getElementById("order-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const customerName = document.getElementById("customer").value.trim();
  const items = [...cart].map(([productId, quantity]) => ({ productId, quantity }));
  try {
    const order = await api("/orders", { method: "POST", body: JSON.stringify({ customerName, items }) });
    cart.clear();
    event.target.reset();
    showMessage(`Order #${order.id} placed — ${money(order.total)}`, "ok");
    await refresh();
  } catch (error) {
    showMessage(error.message, "error");
  }
});

refresh().catch((error) => showMessage(error.message, "error"));
