import type {PagedOrderDto, OrderItemDto} from './types.ts'

// Performs complete validation on order and order items
export function validateOrder(order: PagedOrderDto): { valid: boolean; messages: string[] } {
  const messages: string[] = [];

  if (!order) {
    messages.push("Order is missing");
    return { valid: false, messages };
  }

  const orderPrefix = `Order ${order.orderId}`;

  if (!order.clientId || Number(order.clientId) <= 0) {
    messages.push(`${orderPrefix}: Invalid client ID`);
  }

  if (!order.orderItems || order.orderItems.length === 0) {
    messages.push(`${orderPrefix}: At least one order item is required`);
  } else {
    order.orderItems.forEach((item, idx) => {
      const itemPrefix = `${orderPrefix} - Item ${idx + 1}`;
      if (!item.productId || Number(item.productId) <= 0) {
        messages.push(`${itemPrefix}: Invalid product ID`);
      }
      if (item.quantity == null || Number(item.quantity) <= 0) {
        messages.push(`${itemPrefix}: Invalid quantity`);
      }
      // use unitPrice (unitPriceOnCreatedDate removed)
      if (item.unitPrice == null || Number(item.unitPrice) <= 0) {
        messages.push(`${itemPrefix}: Invalid price`);
      }
    });
  }

  return { valid: messages.length === 0, messages };
}

// Checks if a product is already in the order items (prevents duplicates)
export function isDuplicateProductInOrderItems(orderItems: OrderItemDto[] | null, productId: number) {
  return orderItems?.some(item =>
    // onChange returns e.target.value as string, so convert to number for comparison
    item.productId === Number(productId)
  );
}

// Checks if value is a valid number or empty (for input validation)
export function isValidNumberOrEmpty(value: number | string) {
  return value === "" || (!isNaN(Number(value)) && Number(value) > 0);
}