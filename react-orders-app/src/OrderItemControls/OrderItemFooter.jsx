function OrderItemFooter({products, isAddOrderMode, isEditOrderMode, newNotAddedOrderItem, updateNewNotAddedOrderItem, onAddNewOrderItemClick}){

  const isNewOrderBeingEdited = (isAddOrderMode || isEditOrderMode);

  return (
    <>
      <tr>
        <td>
          <select id="productSelectAdd"
            value={newNotAddedOrderItem?.productId ?? ""}
            onChange={e => updateNewNotAddedOrderItem({...newNotAddedOrderItem, productId: e.target.value})}
            disabled={!isNewOrderBeingEdited}>
            <option value="">Select product</option>
            {products.map(product => (
              <option key={product.productId} value={product.productId}>{product.name}</option>
            ))}
          </select>
        </td>
        <td>
          <input type="number"
          value={newNotAddedOrderItem?.quantity ?? 0}
          disabled={!isNewOrderBeingEdited}
          onChange={e => updateNewNotAddedOrderItem({...newNotAddedOrderItem, quantity: e.target.value})} /></td>
        <td>
          <input type="number"
          value={newNotAddedOrderItem?.unitPriceOnCreatedDate ?? 0}
          disabled={!isNewOrderBeingEdited}
          onChange={e => updateNewNotAddedOrderItem({...newNotAddedOrderItem, unitPriceOnCreatedDate: e.target.value})} />
        </td>
        <td>
          <button className="btn-sm btn btn-primary"
          disabled={!isNewOrderBeingEdited}
          onClick={() => onAddNewOrderItemClick(newNotAddedOrderItem)}>Add order item</button>
        </td>
      </tr>
    </>
  )
}

export default OrderItemFooter