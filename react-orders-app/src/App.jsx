import { useEffect, useState } from 'react'
import OrderTable from './OrderControls/OrderTable'
import OrderItemTable from './OrderItemControls/OrderItemTable'
import './App.css'
import { fetchOrders, addOrder } from './api/orderApi';

function App(){
  const [orders, setOrders] = useState([]);
  const [isAddOrderMode, setIsAddOrderMode] = useState(false);
  const [isEditOrderMode, setIsEditOrderMode] = useState(false);
  const [selectedOrder, setSelectOrder] = useState(null);
  const [newNotAddedOrderItem, setNewNotAddedOrderItem] = useState(null);

  // Functions to handle order selection and editing

  function handleEditOrderClick(editedOrder) {
    setIsAddOrderMode(false);
    setIsEditOrderMode(true);
    setSelectOrder(editedOrder);
  }

  function handleSaveOrderClick(savedOrder) {
    setIsAddOrderMode(false);
    setIsEditOrderMode(false);
    setSelectOrder(savedOrder);
  }

  function handleCancelOrderClick() {
    setIsAddOrderMode(false);
    setIsEditOrderMode(false);
    setSelectOrder(null);
  }

  function handleUpdateOrder(updatedOrder) {
    const updatedOrders = orders.map(order => {
      if (order.orderId === updatedOrder.orderId) {
        return updatedOrder;
      }
      return order;
    });
    setOrders(updatedOrders);
    setSelectOrder(updatedOrder);
  }

  // Functions to handle new order

  function handleNewOrderAddClick() {
    setIsAddOrderMode(true);
    setIsEditOrderMode(false);

    setSelectOrder({ 
      orderId: 0, 
      clientName: '', 
      orderItems: [] });
      
    setNewNotAddedOrderItem({
      productName: '',
      quantity: 0,
      unitPriceOnCreatedDate: 0
    });
  }

  function handleNewOrderSaveClick(newOrderToSave) {
    const orderToSave = {
      ...newOrderToSave, orderItems: selectedOrder?.orderItems || []
    };

    addOrder(orderToSave);

    setIsAddOrderMode(false);
    setSelectOrder(orderToSave);
  }

  function handleNewOrderCancelClick() {
    setIsAddOrderMode(false);
    setSelectOrder(null);
  }

  function handleSetSelectedOrder(updatedOrder) {
    const orderToSave = {
      ...updatedOrder, orderItems: selectedOrder?.orderItems || []
    };

    setSelectOrder(orderToSave);
  }

  // Functions to handle order items change

  // This function is called when order items are added/updated/deleted
  function handleOrderItemsChange(orderWithUpdatedItems) {
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderWithUpdatedItems.orderId) {
        return orderWithUpdatedItems;
      }
      return order;
    });
    setOrders(updatedOrders);
    setSelectOrder(orderWithUpdatedItems);
  }

  useEffect(() => {
    fetchOrders()
      .then(data => setOrders(data))
      .catch(error => console.error("Fetch error:", error));
  }, []);


  return (
    <>
      <OrderTable 
      orders={orders}
      selectedOrder={selectedOrder}
      isAddOrderMode={isAddOrderMode} 
      isEditOrderMode={isEditOrderMode} 
      onSelectOrder={handleSetSelectedOrder}
      onEditOrderClick={handleEditOrderClick}
      onSaveOrderClick={() => handleSaveOrderClick()}
      onCancelOrderClick={() => handleCancelOrderClick()}
      onUpdateOrder={handleUpdateOrder}
      onNewOrderAddClick={handleNewOrderAddClick}
      onNewOrderSaveClick={handleNewOrderSaveClick}
      onNewOrderCancelClick={handleNewOrderCancelClick}
      updateSelectedOrder={handleSetSelectedOrder}
      />
      <OrderItemTable 
      selectedOrder={selectedOrder}
      isAddOrderMode={isAddOrderMode} 
      isEditOrderMode={isEditOrderMode}
      newNotAddedOrderItem={newNotAddedOrderItem}
      updateNewNotAddedOrderItem={setNewNotAddedOrderItem}
      onOrderItemsChange={handleOrderItemsChange}
      />
    </>
  )
}

export default App