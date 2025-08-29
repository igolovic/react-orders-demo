import OrderHeader from './OrderHeader'
import OrderRow from './OrderRow' 
import OrderFooter from './OrderFooter'

function OrderTable({clients, orders, selectedOrder, isAddOrderMode, isEditOrderMode, onSetSelectedOrder, onEditExistingOrderClick, onSaveExistingOrderClick, onCancelExistingOrderClick, onNewOrderAddClick, onNewOrderSaveClick, onNewOrderCancelClick, onUpdateOrderDataInUi, onDeleteExistingOrderClick}) {

  return (
    <>
    <table>
      <OrderHeader />
      <tbody>
        {orders.map(order => (
          <OrderRow
          key={order.orderId} 
          clients={clients}
          order={order} 
          selectedOrder={selectedOrder}
          isAddOrderMode={isAddOrderMode}
          isEditOrderMode={isEditOrderMode}
          onSetSelectedOrder={() => onSetSelectedOrder(order)}
          onEditExistingOrderClick={() => onEditExistingOrderClick(order)}
          onSaveExistingOrderClick={() => onSaveExistingOrderClick(order)}
          onCancelExistingOrderClick={onCancelExistingOrderClick}
          onUpdateOrderDataInUi={onUpdateOrderDataInUi}
          onDeleteExistingOrderClick={() => onDeleteExistingOrderClick(order)}
          />
        ))}
        <OrderFooter 
          clients={clients}
          selectedOrder={selectedOrder}
          isAddOrderMode={isAddOrderMode} 
          isEditOrderMode={isEditOrderMode} 
          onNewOrderSaveClick={onNewOrderSaveClick}
          onNewOrderAddClick={onNewOrderAddClick}
          onNewOrderCancelClick={onNewOrderCancelClick}
          onUpdateOrderDataInUi={onUpdateOrderDataInUi}
          />
      </tbody>
    </table>
    </>
  )
}

export default OrderTable