

function OrderItemFooter({isAddOrderMode, isEditOrderMode, newNotAddedOrderItem, setNewNotAddedOrderItem, onAddNewOrderItem}){

  const isNewOrderBeingEdited = (isAddOrderMode || isEditOrderMode);

  return (
    <>
      <tr>
        <td>
          {<input type="text"
          value={newNotAddedOrderItem.productName} 
          disabled={!isNewOrderBeingEdited}
          onChange={e => setNewNotAddedOrderItem({...newNotAddedOrderItem, productName: e.target.value})} />}
        </td>
        <td>
          {<input type="number" 
          value={newNotAddedOrderItem.quantity} 
          disabled={!isNewOrderBeingEdited}
          onChange={e => setNewNotAddedOrderItem({...newNotAddedOrderItem, quantity: e.target.value})} />}</td>
        <td>
          {<input type="number"
          value={newNotAddedOrderItem.unitPriceOnCreatedDate} 
          disabled={!isNewOrderBeingEdited}
          onChange={e => setNewNotAddedOrderItem({...newNotAddedOrderItem, unitPriceOnCreatedDate: e.target.value})} />}
        </td>
        <td>
          <button 
          disabled={!isNewOrderBeingEdited}
          onClick={() => onAddNewOrderItem(newNotAddedOrderItem)}>Add order item</button>
        </td>
      </tr>
    </>
  )
}

export default OrderItemFooter