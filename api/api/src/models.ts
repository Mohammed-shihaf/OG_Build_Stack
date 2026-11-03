export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface OrderLine {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export type OrderStatus = "PLACED" | "CANCELLED";

export interface PurchaseOrder {
  id: number;
  customerName: string;
  lines: OrderLine[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface CreateOrderRequest {
  customerName: string;
  items: { productId: number; quantity: number }[];
}
