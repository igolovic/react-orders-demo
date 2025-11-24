// @ts-ignore: no declaration file for '../validation'
import { isValidNumberOrEmpty } from '../validation'
import type {OrderItemDto, ProductDto} from '../types'

interface OrderItemRowProps {
  products: ProductDto[];
  orderItem: OrderItemDto;
  isAddOrderMode: boolean;
  isEditOrderMode: boolean;
  onUpdateOrderItem: (updatedOrderItem: OrderItemDto, oldProductId: number, checkDuplicateProductInOrderItems: boolean) => void;
  onDeleteOrderItemClick: (orderItem: OrderItemDto) => void;
}

// Component for a single row in the order items table
function OrderItemRow(props: OrderItemRowProps) {
  const { 
    products, 
    orderItem, 
    isAddOrderMode,
    isEditOrderMode, 
    onUpdateOrderItem, 
    onDeleteOrderItemClick } = props;
  
  const areControlsEditable = isEditOrderMode || isAddOrderMode;

  return (
    <>
      <tr>
        <td>
          {areControlsEditable 
          ? <select id="productSelectEdit"
            value={orderItem?.productId ?? ""}
            onChange={e => onUpdateOrderItem({...orderItem, productId: parseInt(e.target.value)}, orderItem.productId, true)}
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.productId} value={product.productId}>{product.name}</option>
            ))}
          </select> 
          : products.find(p => p.productId === orderItem.productId)?.name
          }
        </td>
        <td>
          {areControlsEditable 
            ? <input type="number" min={0} 
              value={orderItem.quantity} 
              onChange={e => {
                const value = e.target.value;
                if (isValidNumberOrEmpty(value)) {
                  onUpdateOrderItem({...orderItem, quantity: parseInt(e.target.value)}, orderItem.productId, false);
                }
              }} /> 
            :
            orderItem.quantity}
        </td>
        <td>
          {areControlsEditable 
          ? <input type="number" disabled min={0} value={orderItem.unitPrice} 
              onChange={e => {
                const value = e.target.value;
                if(isValidNumberOrEmpty(value)) {
                  onUpdateOrderItem({...orderItem, unitPrice: parseInt(e.target.value)}, orderItem.productId, false);
                }
              }} /> 
              : 
              orderItem.unitPrice
              }
        </td>
        <td>
          <input
            type="text"
            value={(orderItem.unitPrice * orderItem.quantity).toFixed(2)}
            disabled
          />
        </td>
        <td><button className="btn-sm btn btn-danger" onClick={() => onDeleteOrderItemClick(orderItem)} disabled={!areControlsEditable}>Delete</button></td>
      </tr>
    </>
  )
}

export default OrderItemRow