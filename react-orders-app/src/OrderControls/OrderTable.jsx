import OrderHeader from './OrderHeader'
import OrderRow from './OrderRow' 
import OrderFooter from './OrderFooter'

function OrderTable({orders, selectedOrder, isAddOrderMode, isEditOrderMode, onSelectOrder, onAddOrderClick, onEditOrderClick, onSaveOrderClick, onCancelOrderClick}){

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
          />
        ))}
        <OrderFooter 
          selectedOrder={selectedOrder}
          isAddOrderMode={isAddOrderMode} 
          isEditOrderMode={isEditOrderMode} 
          onAddOrderClick={onAddOrderClick} />
      </tbody>
    </table>
    </>
  )
}

export default OrderTable