import OrderItemHeader from "./OrderItemHeader.js"
import OrderItemRow from "./OrderItemRow.js"
import OrderItemFooter from "./OrderItemFooter.js"
// @ts-ignore: validation.js is a JS module without a declaration file
import { isDuplicateProductInOrderItems } from '../validation'
import type {Order, Product, OrderItem} from '../types'

interface OrderItemTableProps {
  products: Product[];
  selectedOrder: Order | null;
  newNotAddedOrderItem: OrderItem | null;
  updateNewNotAddedOrderItem: (orderItem: OrderItem) => void;
  isAddOrderMode: boolean;
  isEditOrderMode: boolean;
  onOrderItemsChange: (order: Order) => void;
}

// Component for the order items table within an order
function OrderItemTable(props: OrderItemTableProps) {
  const { 
    products,
    selectedOrder,
    newNotAddedOrderItem,
    updateNewNotAddedOrderItem,
    isAddOrderMode,
    isEditOrderMode,
    onOrderItemsChange } = props;

  function handleUpdateOrderItem(updatedOrderItem: OrderItem, oldProductId: number, checkDuplicateProductInOrderItems: boolean) {
    if (checkDuplicateProductInOrderItems && isDuplicateProductInOrderItems(selectedOrder!.orderItems, updatedOrderItem.productId)) {
      alert("Order item with this product ID already exists.");
      return;
    }
    const updatedSelectedOrder: Order = {
      ...selectedOrder!,
      orderItems: selectedOrder?.orderItems.map(item =>
        item.productId === oldProductId
          ? {
              ...updatedOrderItem,
              unitPrice: products.find(oi => oi.productId === updatedOrderItem.productId)?.unitPrice ?? updatedOrderItem.unitPrice ?? 0
            }
          : item
      ) ?? []
    };
    onOrderItemsChange(updatedSelectedOrder);
  }

  function handleDeleteOrderItemClick(deletedOrderItem: OrderItem) {
    selectedOrder!.orderItems = selectedOrder!.orderItems.filter(
      oi => CreateTemporaryIdForUnsavedOrderItem(oi) !== CreateTemporaryIdForUnsavedOrderItem(deletedOrderItem)
    );
    onOrderItemsChange(selectedOrder!);
  }

  function handleAddOrderItemClick(addedOrderItem: OrderItem) {
    if (addedOrderItem.productId === null || addedOrderItem.productId === 0) {
      alert("Please select product.");
      return;
    }
    if (addedOrderItem.quantity === null || addedOrderItem.quantity === 0) {
      alert("Please set quantity.");
      return;
    }
    if (isDuplicateProductInOrderItems(selectedOrder!.orderItems, addedOrderItem.productId)) {
      alert("Order item with this product ID already exists.");
      return;
    }
    selectedOrder!.orderItems.push(
      {
        ...addedOrderItem, 
        orderId: 0, 
        orderItemId: 0
      }
    );
    onOrderItemsChange(selectedOrder!);

    // Reset new row item after adding
    // This assumes newNotAddedOrderItem is used to track the new item being added
    updateNewNotAddedOrderItem({
      orderItemId: selectedOrder!.orderId,
      orderId: 0,
      productId: 0,
      unitPrice: 0,
      quantity: 0,
    });
  }

  return (
    <>
      <h4>Order Items</h4>
      <table className="table">
        <OrderItemHeader />
        <tbody>
          {selectedOrder && selectedOrder.orderItems && selectedOrder.orderItems.map(orderItem => {
            // Use a temporary key for new items that don't have an ID yet
            // This is a workaround for React's key requirement in lists
            const tempKey = orderItem.orderItemId
              ? orderItem.orderItemId
              : CreateTemporaryIdForUnsavedOrderItem(orderItem);
            return (
              <OrderItemRow
                key={tempKey}
                products={products}
                orderItem={orderItem}
                isAddOrderMode={isAddOrderMode}
                isEditOrderMode={isEditOrderMode}
                onUpdateOrderItem={handleUpdateOrderItem}
                onDeleteOrderItemClick={handleDeleteOrderItemClick}
              />
            );
          })}
            <OrderItemFooter 
              selectedOrder={selectedOrder}
              products={products}
              isAddOrderMode={isAddOrderMode}
              isEditOrderMode={isEditOrderMode}
              newNotAddedOrderItem={newNotAddedOrderItem}
              updateNewNotAddedOrderItem={updateNewNotAddedOrderItem}
              onAddNewOrderItemClick={handleAddOrderItemClick}
            />
        </tbody>
      </table>
    </>
  )
}

export default OrderItemTable

function CreateTemporaryIdForUnsavedOrderItem(oi: OrderItem): string {
  return `${oi.productId}_${oi.orderId}`;
}
