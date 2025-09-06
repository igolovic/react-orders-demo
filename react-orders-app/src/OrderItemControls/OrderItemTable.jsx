import OrderItemHeader from "./OrderItemHeader"
import OrderItemRow from "./OrderItemRow"
import OrderItemFooter from "./OrderItemFooter"
import { isDuplicateProductInOrderItems } from '../validation.js'

function OrderItemTable({products, selectedOrder, newNotAddedOrderItem, updateNewNotAddedOrderItem, isAddOrderMode, isEditOrderMode, onOrderItemsChange}){

  function handleUpdateOrderItem(updatedOrderItem, oldProductId, checkDuplicateProductInOrderItems) {
    if (checkDuplicateProductInOrderItems && isDuplicateProductInOrderItems(selectedOrder.orderItems, updatedOrderItem.productId)) {
      alert("Order item with this product ID already exists.");
      return;
    }
    let updatedSelectedOrder = {
      ...selectedOrder,
      orderItems: selectedOrder.orderItems.map(item =>
        item.productId === oldProductId ? updatedOrderItem : item
      )
    };
    onOrderItemsChange(updatedSelectedOrder);
  }

  function handleDeleteOrderItemClick(deletedOrderItem) {
    selectedOrder.orderItems = selectedOrder.orderItems.filter(
      oi => CreateTemporaryIdForUnsavedOrderItem(oi) !== CreateTemporaryIdForUnsavedOrderItem(deletedOrderItem)
    );
    onOrderItemsChange(selectedOrder);
  }

  function handleAddOrderItemClick(addedOrderItem) {
    if (isDuplicateProductInOrderItems(selectedOrder.orderItems, addedOrderItem.productId)) {
      alert("Order item with this product ID already exists.");
      return;
    }
    selectedOrder.orderItems.push(
      {
        ...addedOrderItem, 
        orderId: 0, 
        orderItemId: 0
      }
    );
    onOrderItemsChange(selectedOrder);

    // Reset new row item after adding
    // This assumes newNotAddedOrderItem is used to track the new item being added
    updateNewNotAddedOrderItem({
      orderItemId: selectedOrder.orderId,
      orderId: null,
      productId: null,
      productName: '',
      quantity: 0,
      unitPriceOnCreatedDate: 0
    });
  }

  return (
    <>
      <h4>Order Items</h4>
      <table className="table">
        <OrderItemHeader />
        <tbody>
          {selectedOrder && selectedOrder.orderItems.map(orderItem => {
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

function CreateTemporaryIdForUnsavedOrderItem(oi) {
  return `${oi.productId}_${oi.orderId}`;
}
