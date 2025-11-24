import type {PagedOrderDto, ClientDto} from  '../types'

interface OrderRowProps {
  clients: ClientDto[];
  order: PagedOrderDto;
  selectedOrder: PagedOrderDto | null;
  isAddOrderMode: boolean;
  isEditOrderMode: boolean;
  onSetSelectedOrder: (order:PagedOrderDto) => void;
  onEditExistingOrderClick: (order:PagedOrderDto) => void;
  onSaveExistingOrderClick: (order:PagedOrderDto) => void;
  onCancelExistingOrderClick: () => void;
  onUpdateOrderDataInUi: (order:PagedOrderDto) => void;
  onDeleteExistingOrderClick: (order:PagedOrderDto) => void;
  }
// Component for a single row in the orders table
function OrderRow(props: OrderRowProps) {
  const {
    clients,
    order,
    selectedOrder,
    isAddOrderMode,
    isEditOrderMode,
    onSetSelectedOrder,
    onEditExistingOrderClick,
    onSaveExistingOrderClick,
    onCancelExistingOrderClick,
    onUpdateOrderDataInUi,
    onDeleteExistingOrderClick
  } = props;

  const isRowBeingEdited = (!isAddOrderMode && isEditOrderMode && selectedOrder && selectedOrder.orderId === order.orderId);
  const isEditButtonEnabled = !isAddOrderMode && !isEditOrderMode;
  const strSelectedOrderDateCreated = selectedOrder?.dateCreated ? String(selectedOrder.dateCreated) : '';
  const strSelectedOrderDateModified = selectedOrder?.dateModified ? String(selectedOrder.dateModified) : '';
  const strOrderDateCreated = order?.dateCreated ? String(order.dateCreated) : '';
  const strOrderDateModified  = order?.dateModified ? String(order.dateModified) : '';
  return (
    <>
      <tr
        onClick={() => isEditButtonEnabled && onSetSelectedOrder(order)}
        className={selectedOrder?.orderId === order.orderId ? "table-active" : ""}
        style={{ cursor: "pointer" }}
      >
        <td>{isRowBeingEdited ? <input type="text" defaultValue={strSelectedOrderDateCreated} disabled={true} /> : <label>{strOrderDateCreated}</label>}</td>
        <td>{isRowBeingEdited ? <input type="text" defaultValue={strSelectedOrderDateModified} disabled={true} /> : <label>{strOrderDateModified}</label>}</td>
        <td>
          {isRowBeingEdited ? (
            <select
              value={String(selectedOrder?.clientId ?? '')}
              onChange={e => {
                const selectedClientId = parseInt(e.target.value, 10);

                onUpdateOrderDataInUi({
                  ...(selectedOrder ?? order),
                  clientId: selectedClientId
                });
              }}
            >
              {clients.map(client => (
                <option key={client.clientId} value={client.clientId}>{client.name}</option>
              ))}
            </select>
          ) : (
            <label>{clients.find(c => c.clientId === order.clientId)?.name}</label>
          )}
        </td>
        <td>
          {!isRowBeingEdited && (
            <button className="btn-sm btn btn-primary" onClick={() => onEditExistingOrderClick(order)} disabled={!isEditButtonEnabled}>Edit</button>
          )}
          {isRowBeingEdited && (
            <button className="btn-sm btn btn-success" onClick={() => onSaveExistingOrderClick(selectedOrder ?? order)}>Save</button>
          )}
          {isRowBeingEdited && (
            <button className="btn-sm btn btn-secondary" onClick={() => onCancelExistingOrderClick()}>Cancel</button>
          )}
          {!isRowBeingEdited && (
            <button className="btn-sm btn btn-secondary" onClick={() => onDeleteExistingOrderClick(order)} disabled={!isEditButtonEnabled}>Delete</button>
          )}
        </td>
      </tr>
    </>
  )
}

export default OrderRow