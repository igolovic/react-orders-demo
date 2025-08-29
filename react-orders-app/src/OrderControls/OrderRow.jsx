

function OrderRow({clients, order, selectedOrder, isAddOrderMode, isEditOrderMode, onSetSelectedOrder, onEditExistingOrderClick, onSaveExistingOrderClick, onCancelExistingOrderClick, onUpdateOrderDataInUi, onDeleteExistingOrderClick}) {

  const isRowBeingEdited = (!isAddOrderMode && isEditOrderMode && selectedOrder && selectedOrder?.orderId === order.orderId);
  const isEditButtonEnabled = !isAddOrderMode && !isEditOrderMode;

  return (
    <>
      <tr
        // Only allow new selection when no order is being edited or added
        onClick={() => isEditButtonEnabled && onSetSelectedOrder(order)}
        style={{
          background: selectedOrder?.orderId === order.orderId ? "#e0e0e0" : "transparent",
          cursor: "pointer"
        }}
      >
      <td>{isRowBeingEdited ? <input type="text" defaultValue={order.dateCreated} disabled={true} /> : <label>{order.dateCreated}</label>}</td>
      <td>{isRowBeingEdited ? <input type="text" defaultValue={order.dateModified} disabled={true} /> : <label>{order.dateModified}</label>}</td>
      <td>
        {isRowBeingEdited ? <select type="selectClientEdit" 
        value={order.clientId} 
        onChange={e => onUpdateOrderDataInUi({...order, clientId: e.target.value})} 
        >
          {clients.map(client => (
            <option key={client.clientId} value={client.clientId}>{client.name}</option>
          ))}
        </select> : <label>{order.clientName}</label>}
        </td>
      <td>
        {!isRowBeingEdited
          &&
          <button onClick={() => onEditExistingOrderClick(order)} disabled={!isEditButtonEnabled}>Edit</button>
        }
        {isRowBeingEdited
          &&
          <button onClick={() => onSaveExistingOrderClick(order)}>Save</button>
        }
        {isRowBeingEdited
          &&
          <button onClick={() => onCancelExistingOrderClick()}>Cancel</button>
        }
        {!isRowBeingEdited
          &&
          <button onClick={() => onDeleteExistingOrderClick(order)} disabled={!isEditButtonEnabled}>Delete</button>
        }
      </td>
    </tr>
    </>
  )
}

export default OrderRow