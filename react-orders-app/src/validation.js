// Performs complete validation on order and order items
export function validateOrder(order) {
  const errors = {};

  if (!order) {
    errors.order = "Order is missing";
    return { valid: false, errors };
  }
  if (!order.clientId || order.clientId <= 0) {
    errors.clientId = "Invalid client ID";
  }
  if (!order.orderItems || order.orderItems.length === 0) {
    errors.orderItems = "At least one order item is required";
  } else {
    errors.orderItems = [];
    order.orderItems.forEach((item, idx) => {
      const itemErrors = {};
      if (!item.productId || item.productId <= 0) {
        itemErrors.productId = "Invalid product ID";
      }
      if (!item.quantity || item.quantity <= 0) {
        itemErrors.quantity = "Invalid quantity";
      }
      if (Object.keys(itemErrors).length > 0) {
        errors.orderItems[idx] = itemErrors;
      }
    });
    // Remove orderItems if there are no errors
    if (errors.orderItems.length === 0) delete errors.orderItems;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// Checks if a product is already in the order items (prevents duplicates)
export function isDuplicateProductInOrderItems(orderItems, productId) {
  return orderItems.some(item =>
    // onChange returns e.target.value as string, so convert to number for comparison
    item.productId === Number(productId)
  );
}

// Checks if value is a valid number or empty (for input validation)
export function isValidNumberOrEmpty(value) {
  return value === "" || (!isNaN(value) && Number(value) > 0);
}