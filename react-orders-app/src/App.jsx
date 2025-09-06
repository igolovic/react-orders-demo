import { useEffect, useState } from 'react'
import OrderTable from './OrderControls/OrderTable'
import OrderItemTable from './OrderItemControls/OrderItemTable'
import { getClients } from './api/clients.js'
import { fetchOrders, saveOrder, deleteOrder } from './api/orders.js'
import { getProducts } from './api/products.js'
import { validateOrder } from './validation.js'
import './App.css'

function App(){
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [isAddOrderMode, setIsAddOrderMode] = useState(false);
  const [isEditOrderMode, setIsEditOrderMode] = useState(false);
  const [selectedOrder, setSelectOrder] = useState(null);
  const [newNotAddedOrderItem, setNewNotAddedOrderItem] = useState(null);
  const [originalOrder, setOriginalOrder] = useState(null);
  const [nameFilterText, onSetNameFilterText] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  //////////////////////////////////////////////////
  // Functions to handle order selection and editing
  //////////////////////////////////////////////////

  function handleEditExistingOrderClick(editedOrder) {
    setIsAddOrderMode(false);
    setIsEditOrderMode(true);
    setSelectOrder(editedOrder);
    
    // Deep clone to avoid direct state mutation
    const clonedOrder = JSON.parse(JSON.stringify(editedOrder));
    setOriginalOrder(clonedOrder);
  }

  async function handleSaveExistingOrderClick(changedOrder) {
    const { valid, errors } = validateOrder(changedOrder);
    const errorMessage = getErrorMessage(errors);
    if (!valid) {
      alert(errorMessage);
      return;
    }

    const order = await saveOrder(changedOrder, false);

    const result = await fetchOrders(nameFilterText, currentPage);
    setOrders(result.pagedOrders);
    setTotalCount(result.totalCount);

    setIsEditOrderMode(false);
    setIsAddOrderMode(false);

    const selectedOrderIsInResult = result.pagedOrders.find(po => po.orderId === order.orderId);
    if(selectedOrderIsInResult) {
        setSelectOrder(order);
    }
    else {
        setSelectOrder(null);
    }

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
    
    const result = await fetchOrders(nameFilterText, 0);
    setOrders(result.pagedOrders);
    setTotalCount(result.totalCount);

    setSelectOrder(null);
  }

  ////////////////////////////////
  // Functions to handle new order
  ////////////////////////////////

  function handleNewOrderAddClick() {
    setIsAddOrderMode(true);
    setIsEditOrderMode(false);

    clearSelectedOrder(setSelectOrder);
    clearNewNotAddedOrderItem(setNewNotAddedOrderItem);
  }

  async function handleNewOrderSaveClick(newOrder) {
    const { valid, errors } = validateOrder(newOrder);
    const errorMessage = getErrorMessage(errors);
    if (!valid) {
      alert(errorMessage);
      return;
    }

    const order = await saveOrder(newOrder, true);

    const result = await fetchOrders(nameFilterText,	currentPage);
    setOrders(result.pagedOrders);
    setTotalCount(result.totalCount);

    setIsAddOrderMode(false);
    
    const selectedOrderIsInResult = result.pagedOrders.find(po => po.orderId === order.orderId);
    if(selectedOrderIsInResult) {
        setSelectOrder(order);
    }
    else {
        setSelectOrder(null);
    }

    clearNewNotAddedOrderItem(setNewNotAddedOrderItem);
  }

  function handleNewOrderCancelClick() {
    setIsAddOrderMode(false);
    setSelectOrder(null);
  }

  function handleSetSelectedOrder(updatedOrder) {
    setSelectOrder(updatedOrder);
  }
 
  async function handlePageClick(selectedItem) {
    const selectedPage = selectedItem.selected;
    setCurrentPage(selectedPage);

    const result = await fetchOrders(nameFilterText, selectedPage);
    setOrders(result.pagedOrders);
    setTotalCount(result.totalCount);
  }

  /////////////////////////////////////////
  // Functions to handle order items change
  /////////////////////////////////////////

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

  ////////////////////////////
  // Helper functions
    ////////////////////////////

  function getErrorMessage(errors) {
    let errorStrings = [];
    if (errors.clientId) errorStrings.push(`- Client: ${errors.clientId}`);
    if (errors.orderItems) {
      if (typeof errors.orderItems === "string") {
        errorStrings.push(`- Items: ${errors.orderItems}\n`);
      } else {
        errors.orderItems.forEach((itemErr, idx) => {
          if (itemErr) {
            errorStrings.push(`- Item ${idx + 1}:\n`);
            if (itemErr.productId) errorStrings.push(` - Product: ${itemErr.productId}\n`);
            if (itemErr.quantity) errorStrings.push(` - Quantity: ${itemErr.quantity}\n`);
            if (itemErr.unitPriceOnCreatedDate) errorStrings.push(` - Price: ${itemErr.unitPriceOnCreatedDate}\n`);
          }
        });
      }
    }
    return errorStrings.join("\n");
  }


  ////////////////////////////
  // Fetch data initially and on filter/page change
  ////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchOrders(nameFilterText, currentPage);
      setOrders(result.pagedOrders);

      if (selectedOrder !== null) {
        // If selected order was deleted or is not in the current page, clear selection
        const selectedOrderIsInResult = result.pagedOrders.find(po => po.orderId === selectedOrder.orderId);
        if(!selectedOrderIsInResult) {
            setSelectOrder(null);
        }
      }
      
      setTotalCount(result.totalCount);

      const dbProducts = await getProducts();
      setProducts(dbProducts);
      const dbClients = await getClients();
      setClients(dbClients);
    };
    fetchData();
  }, [nameFilterText, currentPage, selectedOrder]);

  return (
    <>
      <OrderTable 
      clients={clients}
      orders={orders}
      selectedOrder={selectedOrder}
      totalCount={totalCount}
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
      nameFilterText={nameFilterText}
      onSetNameFilterText={onSetNameFilterText}
      onPageClick={handlePageClick}
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

