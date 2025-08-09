

function OrderItemFooter({isAddOrderMode, isEditOrderMode, newNotAddedOrderItem, updateNewNotAddedOrderItem, onAddNewOrderItemClick}){

  const isNewOrderBeingEdited = (isAddOrderMode || isEditOrderMode);

  return (
    <>
      <tr>
        <td>
          {<input type="text"
          value={newNotAddedOrderItem?.productName ?? ""} 
          disabled={!isNewOrderBeingEdited}
          onChange={e => updateNewNotAddedOrderItem({...newNotAddedOrderItem, productName: e.target.value})} />}
        </td>
        <td>
          {<input type="number"
          value={newNotAddedOrderItem?.quantity ?? 0}
          disabled={!isNewOrderBeingEdited}
          onChange={e => updateNewNotAddedOrderItem({...newNotAddedOrderItem, quantity: e.target.value})} />}</td>
        <td>
          {<input type="number"
          value={newNotAddedOrderItem?.unitPriceOnCreatedDate ?? 0}
          disabled={!isNewOrderBeingEdited}
          onChange={e => updateNewNotAddedOrderItem({...newNotAddedOrderItem, unitPriceOnCreatedDate: e.target.value})} />}
        </td>
        <td>
          <button 
          disabled={!isNewOrderBeingEdited}
          onClick={() => onAddNewOrderItemClick(newNotAddedOrderItem)}>Add order item</button>
        </td>
      </tr>
    </>
  )
}

export default OrderItemFooter