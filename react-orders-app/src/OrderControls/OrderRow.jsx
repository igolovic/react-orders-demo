

function OrderRow({order, selectedOrder, isAddOrderMode, isEditOrderMode, onSelectOrder, onEditOrderClick, onSaveOrderClick, onCancelOrderClick, onUpdateOrder}) {

  const isRowBeingEdited = (!isAddOrderMode && isEditOrderMode && selectedOrder && selectedOrder?.orderId === order.orderId);
  const isEditButtonEnabled = !isAddOrderMode && !isEditOrderMode;

  return (
    <>
      <tr
        // Only allow new selection when no order is being edited or added
        onClick={() => isEditButtonEnabled && onSelectOrder(order)}
        style={{
          background: selectedOrder?.orderId === order.orderId ? "#e0e0e0" : "transparent",
          cursor: "pointer"
        }}
      >
      <td>{isRowBeingEdited ? <input type="text" defaultValue={order.dateCreated} disabled={true} /> : <label>{order.dateCreated}</label>}</td>
      <td>{isRowBeingEdited ? <input type="text" defaultValue={order.dateModified} disabled={true} /> : <label>{order.dateModified}</label>}</td>
      <td>{isRowBeingEdited ? <input type="text" value={order.clientName} onChange={e => onUpdateOrder({...order, clientName: e.target.value})} /> : <label>{order.clientName}</label>}</td>
      <td>
        {!isRowBeingEdited
          &&
          <button onClick={() => onEditOrderClick(order)} disabled={!isEditButtonEnabled}>Edit</button>
        }
        {isRowBeingEdited
          &&
          <button onClick={() => onSaveOrderClick(order)}>Save</button>
        }
        {isRowBeingEdited
          &&
          <button onClick={() => onCancelOrderClick()}>Cancel</button>
        }
      </td>
    </tr>
    </>
  )
}

export default OrderRow