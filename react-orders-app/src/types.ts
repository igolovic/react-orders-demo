export interface OrderItemDto {
  orderId: number;
  orderItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface PagedOrderDto {
  orderId: number;
  clientId: number;
  clientName: string;
  dateCreated: Date;
  dateModified: Date;
  orderItems: OrderItemDto[];
}

export interface ClientDto {
  clientId: number;
  name: string;
}

export interface ProductDto {
  productId: number;
  name: string;
  unitPrice: number;
}