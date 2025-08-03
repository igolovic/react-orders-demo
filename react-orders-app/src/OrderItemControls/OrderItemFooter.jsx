

function OrderItemFooter(){

  return (
    <>
      <tr>
        CONTINUE HERE
        <td><input type="text" defaultValue={newOrder.clientName} disabled={!isNewOrderBeingEdited} /></td>
        <td>{areControlsEditable ? <input type="text" value={orderItem.productName} onChange={e => onUpdateOrderItem({...orderItem, productName: e.target.value})} /> : orderItem.productName}</td>
        <td>{areControlsEditable ? <input type="number" value={orderItem.quantity} onChange={e => onUpdateOrderItem({...orderItem, quantity: e.target.value})} /> : orderItem.quantity}</td>
        <td>{areControlsEditable ? <input type="number" value={orderItem.unitPriceOnCreatedDate} onChange={e => onUpdateOrderItem({...orderItem, unitPriceOnCreatedDate: e.target.value})} /> : orderItem.unitPriceOnCreatedDate}</td>
        <td><button onClick={() => onDeleteOrderItem(orderItem)}>Delete</button></td>
      </tr>
    </>
  )
}

export default OrderItemFooter