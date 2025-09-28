import { isValidNumberOrEmpty } from '../validation.js'

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
        <td>
          {areControlsEditable 
            ? <input type="number" min={0} value={orderItem.quantity} 
                onChange={e => {
                  const value = e.target.value;
                  if (isValidNumberOrEmpty(value)) {
                    onUpdateOrderItem({...orderItem, quantity: e.target.value}, orderItem.productId, false);
                  }
                }} /> 
            :
            orderItem.quantity
          }
        </td>
        <td>
          {areControlsEditable 
          ? <input type="number" disabled min={0} value={orderItem.unitPrice} 
              onChange={e => {
                const value = e.target.value;
                if(isValidNumberOrEmpty(value)) {
                  onUpdateOrderItem({...orderItem, unitPrice: e.target.value}, orderItem.productId, false);
                }
              }} /> 
              : 
              orderItem.unitPrice
              }
        </td>
        <td><button className="btn-sm btn btn-danger" onClick={() => onDeleteOrderItemClick(orderItem)} disabled={!areControlsEditable}>Delete</button></td>
      </tr>
    </>
  )
}

export default OrderItemRow