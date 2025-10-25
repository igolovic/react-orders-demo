// Component for the header row in the order items table
function OrderItemHeader(){

  return (
    <>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Quantity</th>
            <th>Product price</th>
            <th>Quantity * product price</th>
            <th></th>
          </tr>
        </thead>
    </>
  )
}

export default OrderItemHeader