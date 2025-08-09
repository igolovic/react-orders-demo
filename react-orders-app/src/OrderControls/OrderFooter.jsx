function OrderFooter({isAddOrderMode, selectedOrder, onUpdateOrder, isEditOrderMode, onNewOrderAddClick, onNewOrderSaveClick, onNewOrderCancelClick}) {

  const isNewOrderBeingEdited = (isAddOrderMode && !isEditOrderMode);

  return (
    <>
      <tr>
      <td></td>
      <td></td>
      <td>
        {<input type="text" 
        value={selectedOrder?.clientName ?? ""} 
        disabled={!isNewOrderBeingEdited} 
        onChange={e => onUpdateOrder({...selectedOrder, clientName: e.target.value})} />}
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