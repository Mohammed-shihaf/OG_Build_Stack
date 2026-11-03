import type { CreateOrderRequest, OrderLine, Product, PurchaseOrder } from "./models.js";

export class NotFoundError extends Error {}
export class BadRequestError extends Error {}

const toCents = (amount: number) => Math.round(amount * 100);
const fromCents = (cents: number) => cents / 100;

export function seedProducts(): Product[] {
  return [
    { id: 1, name: "Laptop", category: "Electronics", price: 899.99, stock: 10 },
    { id: 2, name: "Wireless Mouse", category: "Electronics", price: 24.5, stock: 50 },
    { id: 3, name: "Office Chair", category: "Furniture", price: 149.0, stock: 15 },
    { id: 4, name: "Standing Desk", category: "Furniture", price: 399.0, stock: 5 },
    { id: 5, name: "Printer Paper (500 sheets)", category: "Supplies", price: 6.99, stock: 200 },
    { id: 6, name: "Ballpoint Pens (12 pack)", category: "Supplies", price: 4.25, stock: 120 },
  ];
}

export class PurchasingService {
  private readonly products = new Map<number, Product>();
  private readonly orders = new Map<number, PurchaseOrder>();
  private nextOrderId = 1;

  constructor(products: Product[] = seedProducts()) {
    for (const product of products) {
      this.products.set(product.id, product);
    }
  }

  listProducts(): Product[] {
    return [...this.products.values()].sort((a, b) => a.id - b.id);
  }

  getProduct(id: number): Product {
    const product = this.products.get(id);
    if (!product) {
      throw new NotFoundError(`Product ${id} not found`);
    }
    return product;
  }

  listOrders(): PurchaseOrder[] {
    return [...this.orders.values()].sort((a, b) => b.id - a.id);
  }

  getOrder(id: number): PurchaseOrder {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundError(`Order ${id} not found`);
    }
    return order;
  }

  placeOrder(request: CreateOrderRequest): PurchaseOrder {
    const customerName = typeof request?.customerName === "string" ? request.customerName.trim() : "";
    const items = Array.isArray(request?.items) ? request.items : [];
    const valid =
      customerName.length > 0 &&
      items.length > 0 &&
      items.every((item) => Number.isInteger(item?.productId) && Number.isInteger(item?.quantity) && item.quantity >= 1);
    if (!valid) {
      throw new BadRequestError("Customer name and at least one item with quantity of 1 or more are required");
    }

    const requested = new Map<number, number>();
    for (const item of items) {
      requested.set(item.productId, (requested.get(item.productId) ?? 0) + item.quantity);
    }

    const lines: OrderLine[] = [];
    for (const [productId, quantity] of requested) {
      const product = this.getProduct(productId);
      if (quantity > product.stock) {
        throw new BadRequestError(`Only ${product.stock} of ${product.name} in stock`);
      }
      lines.push({
        productId,
        productName: product.name,
        quantity,
        unitPrice: product.price,
        lineTotal: fromCents(toCents(product.price) * quantity),
      });
    }

    for (const line of lines) {
      this.getProduct(line.productId).stock -= line.quantity;
    }

    const order: PurchaseOrder = {
      id: this.nextOrderId++,
      customerName,
      lines,
      total: fromCents(lines.reduce((sum, line) => sum + toCents(line.lineTotal), 0)),
      status: "PLACED",
      createdAt: new Date().toISOString(),
    };
    this.orders.set(order.id, order);
    return order;
  }

  cancelOrder(id: number): PurchaseOrder {
    const order = this.getOrder(id);
    if (order.status === "CANCELLED") {
      throw new BadRequestError(`Order ${id} is already cancelled`);
    }
    for (const line of order.lines) {
      this.getProduct(line.productId).stock += line.quantity;
    }
    order.status = "CANCELLED";
    return order;
  }
}
