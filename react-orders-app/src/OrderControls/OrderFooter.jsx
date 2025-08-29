function OrderFooter({clients, isAddOrderMode, selectedOrder, onUpdateOrderDataInUi, isEditOrderMode, onNewOrderAddClick, onNewOrderSaveClick, onNewOrderCancelClick}) {

  const isNewOrderBeingEdited = (isAddOrderMode && !isEditOrderMode && selectedOrder.orderId === 0);

  return (
    <>
      <tr>
      <td></td>
      <td></td>
      <td>     
      {isNewOrderBeingEdited &&
        <select id="clientSelectAdd"
          value={selectedOrder?.clientId ?? ""}
          onChange={e => onUpdateOrderDataInUi({...selectedOrder, clientId: e.target.value})}
          disabled={!isNewOrderBeingEdited}>
          <option value="">Select client</option>
          {
          clients.map(client => (<option key={client.clientId} value={client.clientId}>{client.name}</option>))}
        </select>}
      </td>
        <td>
          {!isNewOrderBeingEdited
            &&
            <button onClick={onNewOrderAddClick} disabled={isEditOrderMode}>Add Order</button>
          }
          {isNewOrderBeingEdited
            &&
            <button onClick={() => onNewOrderSaveClick(selectedOrder)} disabled={isEditOrderMode}>Save new order</button>
          }
          {isNewOrderBeingEdited
            &&
            <button onClick={onNewOrderCancelClick}>Cancel</button>
          }
        </td>
      </tr>
    </>
  )
}

export default OrderFooter