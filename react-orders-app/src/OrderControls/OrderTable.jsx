import OrderHeader from './OrderHeader'
import OrderFilter from './OrderFilter'
import OrderRow from './OrderRow' 
import OrderFooter from './OrderFooter'
import ReactPaginate from 'react-paginate';
import {PAGE_SIZE} from '../constants.js'

function OrderTable({clients, orders, selectedOrder, totalCount, isAddOrderMode, isEditOrderMode, onSetSelectedOrder, onEditExistingOrderClick, onSaveExistingOrderClick, onCancelExistingOrderClick, onNewOrderAddClick, onNewOrderSaveClick, onNewOrderCancelClick, onUpdateOrderDataInUi, onDeleteExistingOrderClick, nameFilterText, onSetNameFilterText, onPageClick}) {

  return (
    <>
    <h4>Orders</h4>
    <table className="table">
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
          onSetSelectedOrder={onSetSelectedOrder}
          onEditExistingOrderClick={onEditExistingOrderClick}
          onSaveExistingOrderClick={onSaveExistingOrderClick}
          onCancelExistingOrderClick={onCancelExistingOrderClick}
          onUpdateOrderDataInUi={onUpdateOrderDataInUi}
          onDeleteExistingOrderClick={onDeleteExistingOrderClick}
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
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            </td>
          </tr>
      </tbody>
    </table>
    </>
  )
}

export default OrderTable