import OrderHeader from './OrderHeader'
import OrderFilter from './OrderFilter'
import OrderRow from './OrderRow' 
import OrderFooter from './OrderFooter'
import {PAGE_SIZE} from '../constants'
import type {Order, Client} from '../types'

// @ts-ignore: no declaration file for 'react-paginate'
import ReactPaginate from 'react-paginate'

interface OrderTableProps {
  clients: Client[];
  orders: Order[];
  selectedOrder: Order | null;
  totalCount: number;
  isAddOrderMode: boolean;
  isEditOrderMode: boolean;
  onSetSelectedOrder: (order:Order) => void;
  onEditExistingOrderClick: (order:Order) => void;
  onSaveExistingOrderClick: (order:Order) => void;
  onCancelExistingOrderClick: () => void;
  onNewOrderAddClick: () => void;
  onNewOrderSaveClick: (order: Order) => void;
  onNewOrderCancelClick: () => void;
  onUpdateOrderDataInUi: (order:Order) => void;
  onDeleteExistingOrderClick: (order:Order) => void;
  nameFilterText: string;
  onSetNameFilterText: (filterText: string) => void;
  onPageClick: (selectedItem: { selected: number }) => void;
}

function OrderTable(props: OrderTableProps) {

  const {
    clients,
    orders,
    selectedOrder,
    totalCount,
    isAddOrderMode,
    isEditOrderMode,
    onSetSelectedOrder,
    onEditExistingOrderClick,
    onSaveExistingOrderClick,
    onCancelExistingOrderClick,
    onNewOrderAddClick,
    onNewOrderSaveClick,
    onNewOrderCancelClick,
    onUpdateOrderDataInUi,
    onDeleteExistingOrderClick,
    nameFilterText,
    onSetNameFilterText,
    onPageClick
  } = props;

  return (
    <>
    <h4>Orders</h4>
    <table className="table">
      <OrderHeader />
      <tbody>
        <OrderFilter
        nameFilterText={nameFilterText} 
        onSetNameFilterText={onSetNameFilterText}
        isAddOrderMode={isAddOrderMode}
        isEditOrderMode={isEditOrderMode}
        selectedOrder={selectedOrder}
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