import { useEffect, useState } from 'react'
import OrderTable from './OrderControls/OrderTable'
import OrderItemTable from './OrderItemControls/OrderItemTable'
import { ADD_ORDER_MODE_STATUS_STARTED, ADD_ORDER_MODE_STATUS_ENDED_WITH_SAVE, ADD_ORDER_MODE_STATUS_ENDED_WITH_CANCEL } from './constants' // Import constants for order
import './App.css'

function App(){
  const [orders, setOrders] = useState([]);
  const [isAddOrderMode, setIsAddOrderMode] = useState(false);
  const [isEditOrderMode, setIsEditOrderMode] = useState(false);
  const [selectedOrder, handleSelectOrder] = useState(null);

  function handleAddOrderClick(addOrderModeStatus, newOrder = null) {
    switch (addOrderModeStatus) {
      case ADD_ORDER_MODE_STATUS_STARTED:
        {
          setIsAddOrderMode(true);
          handleSelectOrder(null);
        }
        break;
      case ADD_ORDER_MODE_STATUS_ENDED_WITH_SAVE:
        {
          setIsAddOrderMode(false);
          handleSelectOrder(newOrder);
        }
        break;
      case ADD_ORDER_MODE_STATUS_ENDED_WITH_CANCEL:
        {
          setIsAddOrderMode(false);
          handleSelectOrder(null);
        }
        break;
      }
    setIsEditOrderMode(false);
  }

  function handleEditOrderClick(editedOrder) {
    setIsAddOrderMode(false);
    setIsEditOrderMode(true);
    handleSelectOrder(editedOrder);
  }

  function handleSaveOrderClick(savedOrder) {
    setIsAddOrderMode(false);
    setIsEditOrderMode(false);
    handleSelectOrder(savedOrder);
  }

  function handleCancelOrderClick() {
    setIsAddOrderMode(false);
    setIsEditOrderMode(false);
    handleSelectOrder(null);
  }

  function handleOrderItemsChange(orderWithUpdatedItems) {
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderWithUpdatedItems.orderId) {
        return orderWithUpdatedItems;
      }
      return order;
    });
    setOrders(updatedOrders);
    handleSelectOrder(orderWithUpdatedItems);
  }

  function fetchOrders() {
    const pageIndex = 0;
    const pageSize = 10;
    const sortColumn = "id";
    const sortDirection = "asc";
    const filter = "";
    const baseUrl = "http://localhost:5248/api/orders/paged";

    const params = new URLSearchParams({
      pageIndex,
      pageSize,
      sortColumn,
      sortDirection,
      filter
    });

      // Fetch orders from the API with pagination, sorting, and filtering
    fetch(`${baseUrl}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
        console.log(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <>
      <OrderTable 
      orders={orders}
      selectedOrder={selectedOrder}
      isAddOrderMode={isAddOrderMode} 
      isEditOrderMode={isEditOrderMode} 
      onSelectOrder={handleSelectOrder}
      onAddOrderClick={handleAddOrderClick}
      onEditOrderClick={handleEditOrderClick}
      onSaveOrderClick={() => handleSaveOrderClick()}
      onCancelOrderClick={() => handleCancelOrderClick()} 
      />
      <OrderItemTable 
      selectedOrder={selectedOrder}
      isAddOrderMode={isAddOrderMode} 
      isEditOrderMode={isEditOrderMode}
      onOrderItemsChange={handleOrderItemsChange}
      />
    </>
  )
}

export default App