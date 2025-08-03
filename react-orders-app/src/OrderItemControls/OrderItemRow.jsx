function OrderItemRow({orderItem, isAddOrderMode, isEditOrderMode, onUpdateOrderItem, onDeleteOrderItem}){

  const areControlsEditable = isEditOrderMode || isAddOrderMode;

  return (
    <>
      <tr>
        <td>
          {areControlsEditable ? (
            <input
              type="text"
              value={orderItem.productName}
              onChange={e => {
                const checkDuplicateProductInOrderItems = orderItem.productName !== e.target.value;
                onUpdateOrderItem({ ...orderItem, productName: e.target.value }, checkDuplicateProductInOrderItems);
              }}
            />
          ) : orderItem.productName}
        </td>
        <td>{areControlsEditable ? <input type="number" value={orderItem.quantity} onChange={e => onUpdateOrderItem({...orderItem, quantity: e.target.value}, false)} /> : orderItem.quantity}</td>
        <td>{areControlsEditable ? <input type="number" value={orderItem.unitPriceOnCreatedDate} onChange={e => onUpdateOrderItem({...orderItem, unitPriceOnCreatedDate: e.target.value}, false)} /> : orderItem.unitPriceOnCreatedDate}</td>
        <td><button onClick={() => onDeleteOrderItem(orderItem)} disabled={!areControlsEditable}>Delete</button></td>
      </tr>
    </>
  )
}

export default OrderItemRow