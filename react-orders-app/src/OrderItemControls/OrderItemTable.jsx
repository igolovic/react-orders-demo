import OrderItemHeader from "./OrderItemHeader"
import OrderItemRow from "./OrderItemRow"
import OrderItemFooter from "./OrderItemFooter"

function OrderItemTable({selectedOrder, isAddOrderMode, isEditOrderMode, onOrderItemsChange}){

  function handleUpdateOrderItem(updatedOrderItem) {
    let updatedSelectedOrder = {
      ...selectedOrder,
      orderItems: selectedOrder.orderItems.map(item =>
        item.orderItemId === updatedOrderItem.orderItemId ? updatedOrderItem : item
      )
    };
    onOrderItemsChange(updatedSelectedOrder);
  }

  function handleDeleteOrderItem(orderItem) {
    selectedOrder.orderItems = selectedOrder.orderItems.filter(oi => oi.orderItemId !== orderItem.orderItemId);
    onOrderItemsChange(selectedOrder);
  }

  return (
    <>
      <h2>Order Items</h2>
      <table>
        <OrderItemHeader />
        <tbody>
          {selectedOrder && selectedOrder.orderItems.map(orderItem => (
              <OrderItemRow 
              key={orderItem.orderItemId} 
              orderItem={orderItem} 
              isAddOrderMode={isAddOrderMode}
              isEditOrderMode={isEditOrderMode} 
              onUpdateOrderItem={handleUpdateOrderItem}
              onDeleteOrderItem={handleDeleteOrderItem}
              />
            ))}
         <OrderItemFooter />
        </tbody>
      </table>
    </>
  )
}

export default OrderItemTable