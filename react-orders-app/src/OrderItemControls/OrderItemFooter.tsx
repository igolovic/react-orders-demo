import type {Order, OrderItem, Product} from '../types'

interface OrderItemFooterProps{
  selectedOrder: Order | null
  products: Product[];
  isAddOrderMode: boolean;
  isEditOrderMode: boolean;
  newNotAddedOrderItem: OrderItem | null;
  updateNewNotAddedOrderItem: (orderItem: OrderItem) => void;
  onAddNewOrderItemClick: (orderItem: OrderItem) => void;
}

// Component for the footer row in the order items table, handling new order item addition  
function OrderItemFooter(props: OrderItemFooterProps) {
  const {
    selectedOrder,
    products,
    isAddOrderMode,
    isEditOrderMode,
    newNotAddedOrderItem,
    updateNewNotAddedOrderItem,
    onAddNewOrderItemClick
  } = props;

  const isNewOrderBeingEdited = (isAddOrderMode || isEditOrderMode);
  const totalAmount = 
    selectedOrder ? 
    selectedOrder.orderItems ? 
    selectedOrder.orderItems
      .reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0).toFixed(2) : '' : ''; 

  return (
    <>
      <tr>
        <td>
          <select id="productSelectAdd"
            value={newNotAddedOrderItem?.productId ?? ""}
            onChange={e => {
              const selectedProductId = parseInt(e.target.value);
              const selectedProduct =  products.find(p => p.productId === selectedProductId);
              updateNewNotAddedOrderItem({...newNotAddedOrderItem, productId: selectedProductId, unitPrice: selectedProduct?.unitPrice} as OrderItem)
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
          onChange={e => updateNewNotAddedOrderItem({...newNotAddedOrderItem, quantity: parseInt(e.target.value)} as OrderItem)}
        />
        </td>
        <td>
          <input type="number"
          value={newNotAddedOrderItem?.unitPrice ?? 0}
          disabled
          />
        </td>
        <td>
          <button className="btn-sm btn btn-primary"
          disabled={!isNewOrderBeingEdited}
          onClick={() => onAddNewOrderItemClick(newNotAddedOrderItem!)}>Add order item</button>
        </td>
      </tr>
      <tr>
        <td colSpan={3}>
        </td>
        <td>
          <input type="text" disabled value={totalAmount} />
        </td>
        <td>
        </td>
      </tr>
    </>
  )
}

export default OrderItemFooter