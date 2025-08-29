import { useEffect, useState } from 'react'
import OrderTable from './OrderControls/OrderTable'
import OrderItemTable from './OrderItemControls/OrderItemTable'
import './App.css'
import { fetchOrders, saveOrder, getClients, getProducts, deleteOrder } from './api/orderApi';

function App(){
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [isAddOrderMode, setIsAddOrderMode] = useState(false);
  const [isEditOrderMode, setIsEditOrderMode] = useState(false);
  const [selectedOrder, setSelectOrder] = useState(null);
  const [newNotAddedOrderItem, setNewNotAddedOrderItem] = useState(null);
  const [originalOrder, setOriginalOrder] = useState(null);

  // Functions to handle order selection and editing

  function handleEditExistingOrderClick(editedOrder) {
    setIsAddOrderMode(false);
    setIsEditOrderMode(true);
    setSelectOrder(editedOrder);
    
    // Deep clone to avoid direct state mutation
    const clonedOrder = JSON.parse(JSON.stringify(editedOrder));
    setOriginalOrder(clonedOrder);
  }

  async function handleSaveExistingOrderClick(changedOrder) {
    const order = await saveOrder(changedOrder, false);

    const dbOrders = await fetchOrders();
    setOrders(dbOrders);

    setIsEditOrderMode(false);
    setIsAddOrderMode(false);
    setSelectOrder(order);

    clearNewNotAddedOrderItem(setNewNotAddedOrderItem);
    setOriginalOrder(null);
  }

  function handleCancelExistingOrderClick() {
    setIsAddOrderMode(false);
    setIsEditOrderMode(false);

    // Revert changed order in the orders list
    const originalOrders = orders.map(o => o.orderId === selectedOrder.orderId ? originalOrder : o);
    setOrders(originalOrders);
    setSelectOrder(originalOrder);
    
    clearNewNotAddedOrderItem(setNewNotAddedOrderItem);
    setOriginalOrder(null);
  }

  function handelUpdateOrderDataInUi(updatedOrder) {
    const updatedOrders = orders.map(order => {
      if (order.orderId === updatedOrder.orderId) {
        return updatedOrder;
      }
      return order;
    });
    setOrders(updatedOrders);
    setSelectOrder(updatedOrder);
  }

  async function handleDeleteExistingOrderClick(orderToDelete) {
    await deleteOrder(orderToDelete.orderId);
    const dbOrders = await fetchOrders();
    setOrders(dbOrders);
    setSelectOrder(null);
  }

  // Functions to handle new order

  function handleNewOrderAddClick() {
    setIsAddOrderMode(true);
    setIsEditOrderMode(false);

    clearSelectedOrder(setSelectOrder);
    clearNewNotAddedOrderItem(setNewNotAddedOrderItem);
  }

  async function handleNewOrderSaveClick(newOrder) {
    const order = await saveOrder(newOrder, true);

    const dbOrders = await fetchOrders();
    setOrders(dbOrders);

    setIsAddOrderMode(false);
    setSelectOrder(order);

    clearNewNotAddedOrderItem(setNewNotAddedOrderItem);
  }

  function handleNewOrderCancelClick() {
    setIsAddOrderMode(false);
    setSelectOrder(null);
  }

  function handleSetSelectedOrder(updatedOrder) {
    setSelectOrder(updatedOrder);
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
    const fetchData = async () => {
      const dbOrders = await fetchOrders();
      setOrders(dbOrders);

      const dbProducts = await getProducts();
      setProducts(dbProducts);
      const dbClients = await getClients();
      setClients(dbClients);
    };
    fetchData();
  }, []);

  return (
    <>
      <OrderTable 
      clients={clients}
      orders={orders}
      selectedOrder={selectedOrder}
      isAddOrderMode={isAddOrderMode} 
      isEditOrderMode={isEditOrderMode} 
      onSetSelectedOrder={handleSetSelectedOrder}
      onEditExistingOrderClick={handleEditExistingOrderClick}
      onSaveExistingOrderClick={handleSaveExistingOrderClick}
      onCancelExistingOrderClick={handleCancelExistingOrderClick}
      onNewOrderAddClick={handleNewOrderAddClick}
      onNewOrderSaveClick={handleNewOrderSaveClick}
      onNewOrderCancelClick={handleNewOrderCancelClick}
      onUpdateOrderDataInUi={handelUpdateOrderDataInUi}
      onDeleteExistingOrderClick={handleDeleteExistingOrderClick}
      />
      <OrderItemTable 
      products={products}
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

function clearSelectedOrder(setSelectOrder) {
  setSelectOrder({
    orderId: 0,
    clientId: 0,
    orderItems: []
  });
}

function clearNewNotAddedOrderItem(setNewNotAddedOrderItem) {
  setNewNotAddedOrderItem({
    productId: 0,
    productName: '',
    quantity: 0,
    unitPriceOnCreatedDate: 0
  });
}

