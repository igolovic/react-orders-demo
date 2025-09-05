function OrderItemRow({products, orderItem, isAddOrderMode, isEditOrderMode, onUpdateOrderItem, onDeleteOrderItemClick}) {

  const areControlsEditable = isEditOrderMode || isAddOrderMode;

  return (
    <>
      <tr>
        <td>
          {areControlsEditable ? (<select id="productSelectEdit"
            value={orderItem?.productId ?? ""}
            onChange={e => onUpdateOrderItem({...orderItem, productId: e.target.value}, orderItem.productId, true)}
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.productId} value={product.productId}>{product.name}</option>
            ))}
          </select>) : orderItem.productName}

        </td>
        <td>{areControlsEditable ? <input type="number" value={orderItem.quantity} onChange={e => onUpdateOrderItem({...orderItem, quantity: e.target.value}, orderItem.productId, false)} /> : orderItem.quantity}</td>
        <td>{areControlsEditable ? <input type="number" value={orderItem.unitPriceOnCreatedDate} onChange={e => onUpdateOrderItem({...orderItem, unitPriceOnCreatedDate: e.target.value}, orderItem.productId, false)} /> : orderItem.unitPriceOnCreatedDate}</td>
        <td><button className="btn-sm btn btn-danger" onClick={() => onDeleteOrderItemClick(orderItem)} disabled={!areControlsEditable}>Delete</button></td>
      </tr>
    </>
  )
}

export default OrderItemRow