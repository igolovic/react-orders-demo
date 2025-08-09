import OrderHeader from './OrderHeader'
import OrderRow from './OrderRow' 
import OrderFooter from './OrderFooter'

function OrderTable({orders, selectedOrder, isAddOrderMode, isEditOrderMode, onSelectOrder, onEditOrderClick, onSaveOrderClick, onCancelOrderClick, onUpdateOrder, onNewOrderAddClick, onNewOrderSaveClick, onNewOrderCancelClick, updateSelectedOrder}) {

  return (
    <>
    <table>
      <OrderHeader />
      <tbody>
        {orders.map(order => (
          <OrderRow
          key={order.orderId} 
          order={order} 
          selectedOrder={selectedOrder}
          isAddOrderMode={isAddOrderMode}
          isEditOrderMode={isEditOrderMode}
          onSelectOrder={() => onSelectOrder(order)}
          onEditOrderClick={() => onEditOrderClick(order)}
          onSaveOrderClick={() => onSaveOrderClick(order)}
          onCancelOrderClick={onCancelOrderClick}
          onUpdateOrder={onUpdateOrder}
          />
        ))}
        <OrderFooter 
          selectedOrder={selectedOrder}
          isAddOrderMode={isAddOrderMode} 
          isEditOrderMode={isEditOrderMode} 
          onUpdateOrder={onUpdateOrder}
          onNewOrderSaveClick={onNewOrderSaveClick}
          onNewOrderAddClick={onNewOrderAddClick}
          onNewOrderCancelClick={onNewOrderCancelClick}
          />
      </tbody>
    </table>
    </>
  )
}

export default OrderTable