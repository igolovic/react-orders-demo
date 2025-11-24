import type {ClientDto, PagedOrderDto} from '../types'; 

interface OrderFooterProps {
  clients: ClientDto[];
  isAddOrderMode: boolean;
  isEditOrderMode: boolean;
  selectedOrder: PagedOrderDto | null ;
  onUpdateOrderDataInUi: (order: PagedOrderDto) => void;
  onNewOrderAddClick: () => void;
  onNewOrderSaveClick: (order: PagedOrderDto) => void;
  onNewOrderCancelClick: () => void;
}

// Component for the footer row in the orders table, handling new order addition
function OrderFooter(props: OrderFooterProps) {

  const { 
    clients, 
    isAddOrderMode,
    isEditOrderMode,
    selectedOrder,
    onUpdateOrderDataInUi,
    onNewOrderAddClick,
    onNewOrderSaveClick,
    onNewOrderCancelClick

  } = props;

  const isNewOrderBeingEdited = (isAddOrderMode && !isEditOrderMode && selectedOrder?.orderId === 0);

  return (
    <>
      <tr>
      <td></td>
      <td></td>
      <td>     
      {isNewOrderBeingEdited &&
        <select id="clientSelectAdd"
          value={ selectedOrder?.clientId ?? ""}
          onChange={e => props.onUpdateOrderDataInUi({...selectedOrder, clientId: parseInt(e.target.value)} as PagedOrderDto)}
          disabled={!isNewOrderBeingEdited}>
          <option value="">Select client</option>
          {
            clients.map(client => (<option key={client.clientId} value={client.clientId}>{client.name}</option>))
          }
        </select>}
      </td>
        <td>
          {!isNewOrderBeingEdited
            &&
            <button className="btn-sm btn btn-primary" onClick={onNewOrderAddClick} disabled={isEditOrderMode}>Add Order</button>
          }
          {isNewOrderBeingEdited
            &&
            <button className="btn-sm btn btn-primary" onClick={() => onNewOrderSaveClick(selectedOrder!)} disabled={isEditOrderMode}>Save new order</button>
          }
          {isNewOrderBeingEdited
            &&
            <button className="btn-sm btn btn-secondary" onClick={onNewOrderCancelClick}>Cancel</button>
          }
        </td>
      </tr>
    </>
  )
}

export default OrderFooter