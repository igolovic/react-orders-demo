export interface OrderItem {
  orderId: number;
  orderItemId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  orderId: number;
  clientId: number;
  clientName: string;
  dateCreated: Date;
  dateModified: Date;
  orderItems: OrderItem[];
}

export interface Client {
  clientId: number;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  productId: number;
  name: string;
  unitPrice: number;
}