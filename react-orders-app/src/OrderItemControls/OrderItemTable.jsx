import OrderItemHeader from "./OrderItemHeader"
import OrderItemRow from "./OrderItemRow"
import OrderItemFooter from "./OrderItemFooter"

function OrderItemTable({selectedOrder, newNotAddedOrderItem, setNewNotAddedOrderItem, isAddOrderMode, isEditOrderMode, onOrderItemsChange}){

  function isDuplicateProductName(orderItems, productName) {
    // Check if the product name already exists in the order items
    // Exclude the current order item if excludeOrderItemId is provided
    return orderItems.some(item =>
      item.productName === productName
      // && (
      //   excludeOrderItemId == null || GetOrderItemIdentifierFromProductAndOrderId(item) === excludeOrderItemId
      // )
    );
  }
  
  function handleUpdateOrderItem(updatedOrderItem, checkDuplicateProductInOrderItems) {
    if (checkDuplicateProductInOrderItems && isDuplicateProductName(selectedOrder.orderItems, updatedOrderItem.productName)) {
      alert("Order item with this product name already exists.");
      return;
    }
    let updatedSelectedOrder = {
      ...selectedOrder,
      orderItems: selectedOrder.orderItems.map(item =>
        item.orderItemId === updatedOrderItem.orderItemId ? updatedOrderItem : item
      )
    };
    onOrderItemsChange(updatedSelectedOrder);
  }

  function handleDeleteOrderItem(deletedOrderItem) {
    selectedOrder.orderItems = selectedOrder.orderItems.filter(
      oi => GetOrderItemIdentifierFromProductAndOrderId(oi) !== GetOrderItemIdentifierFromProductAndOrderId(deletedOrderItem)
    );
    onOrderItemsChange(selectedOrder);
  }

  function handleAddOrderItem(addedOrderItem) {
    if (isDuplicateProductName(selectedOrder.orderItems, addedOrderItem.productName)) {
      alert("Order item with this product name already exists.");
      return;
    }
    selectedOrder.orderItems.push(
      {...addedOrderItem, 
        orderId: selectedOrder.orderId, 
        productId: null, 
        orderItemId: null}
    );
    onOrderItemsChange(selectedOrder);

    // Reset new row item after adding
    // This assumes newNotAddedOrderItem is used to track the new item being added
    setNewNotAddedOrderItem({
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
      <h2>Order Items</h2>
      <table>
        <OrderItemHeader />
        <tbody>
          {selectedOrder && selectedOrder.orderItems.map(orderItem => {
            // Use a temporary key for new items that don't have an ID yet
            // This is a workaround for React's key requirement in lists
            const tempKey = orderItem.orderItemId
              ? orderItem.orderItemId
              : GetOrderItemIdentifierFromProductAndOrderId(orderItem);
            return (
              <OrderItemRow
                key={tempKey}
                orderItem={orderItem}
                isAddOrderMode={isAddOrderMode}
                isEditOrderMode={isEditOrderMode}
                onUpdateOrderItem={handleUpdateOrderItem}
                onDeleteOrderItem={handleDeleteOrderItem}
              />
            );
          })}
            <OrderItemFooter 
            isAddOrderMode={isAddOrderMode}
            isEditOrderMode={isEditOrderMode}
            newNotAddedOrderItem={newNotAddedOrderItem}
            setNewNotAddedOrderItem={setNewNotAddedOrderItem}
            onAddNewOrderItem={handleAddOrderItem}
          />
        </tbody>
      </table>
    </>
  )
}

export default OrderItemTable

// Helper function to generate a unique identifier for order items based on product name and order ID
// This is used to ensure that each order item can be uniquely identified in the list
// Used because of temporary items that don't have a database ID yet
function GetOrderItemIdentifierFromProductAndOrderId(oi) {
  return `${oi.productName}_${oi.orderId}`;
}
