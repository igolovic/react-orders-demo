import OrderHeader from './OrderHeader'
import OrderFilter from './OrderFilter'
import OrderRow from './OrderRow' 
import OrderFooter from './OrderFooter'
import ReactPaginate from 'react-paginate';
import {PAGE_SIZE} from '../constants.js'

function OrderTable({clients, orders, selectedOrder, totalCount, isAddOrderMode, isEditOrderMode, onSetSelectedOrder, onEditExistingOrderClick, onSaveExistingOrderClick, onCancelExistingOrderClick, onNewOrderAddClick, onNewOrderSaveClick, onNewOrderCancelClick, onUpdateOrderDataInUi, onDeleteExistingOrderClick, nameFilterText, onSetNameFilterText, onPageClick}) {

  return (
    <>
    <table>
      <OrderHeader />
      <tbody>
        <OrderFilter
         nameFilterText={nameFilterText} 
         onSetNameFilterText={onSetNameFilterText}
         />
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
          <tr>
            <td colSpan={4}>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={Math.ceil(totalCount / PAGE_SIZE)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </td>
          </tr>
      </tbody>
    </table>
    </>
  )
}

export default OrderTable