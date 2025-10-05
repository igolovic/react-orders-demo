function OrderItemFooter({products, isAddOrderMode, isEditOrderMode, newNotAddedOrderItem, updateNewNotAddedOrderItem, onAddNewOrderItemClick}){

  const isNewOrderBeingEdited = (isAddOrderMode || isEditOrderMode);

  return (
    <>
      <tr>
        <td>
          <select id="productSelectAdd"
            value={newNotAddedOrderItem?.productId ?? ""}
            onChange={e => {
              const selectedProductId = parseInt(e.target.value);
              const selectedProduct =  products.find(p => p.productId === parseInt(selectedProductId));
              updateNewNotAddedOrderItem({...newNotAddedOrderItem, productId: selectedProductId, unitPrice: selectedProduct.unitPrice})
            }}
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
          value={newNotAddedOrderItem?.unitPrice ?? 0}
          disabled
          // onChange={e => updateNewNotAddedOrderItem({...newNotAddedOrderItem, unitPrice: e.target.value})} 
          />
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