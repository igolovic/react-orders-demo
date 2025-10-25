import { useEffect, useState } from 'react'
import OrderTable from './OrderControls/OrderTable'
import OrderItemTable from './OrderItemControls/OrderItemTable'
import { getClients } from './api/clients'
// @ts-ignore: no declaration file for './api/orders'
import { fetchOrders, saveOrder, deleteOrder } from './api/orders'
// @ts-ignore: no declaration file for './api/products'
import { getProducts } from './api/products'
// @ts-ignore: no declaration file for './validation'
import { validateOrder } from './validation.ts'
// @ts-ignore: no declaration file for './App.css'
import './App.css'
import type {Order, OrderItem, Client, Product} from './types.ts'

function App(){
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isAddOrderMode, setIsAddOrderMode] = useState(false);
  const [isEditOrderMode, setIsEditOrderMode] = useState(false);
  const [selectedOrder, setSelectOrder] = useState<Order | null>(null);
  const [newNotAddedOrderItem, setNewNotAddedOrderItem] = useState<OrderItem | null>(null);
  const [originalOrder, setOriginalOrder] = useState<Order | null>(null);
  const [nameFilterText, onSetNameFilterText] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  //////////////////////////////////////////////////
  // Functions to handle order selection and editing
  //////////////////////////////////////////////////

  function handleEditExistingOrderClick(editedOrder: Order) {
    setIsAddOrderMode(false);
    setIsEditOrderMode(true);
    setSelectOrder(editedOrder);
    
    // Deep clone to avoid direct state mutation
    const clonedOrder = JSON.parse(JSON.stringify(editedOrder));
    setOriginalOrder(clonedOrder);
  }

  async function handleSaveExistingOrderClick(changedOrder: Order) {
    const { valid, messages } = validateOrder(changedOrder);
    const errorMessage = getErrorMessage(messages);
    if (!valid) {
      alert(errorMessage);
      return;
    }

    const order = await saveOrder(changedOrder, false);

    const result: { pagedOrders: Order[]; totalCount: number } = await fetchOrders(nameFilterText, currentPage);
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
    if(selectedOrder)
    {
        const originalOrders = orders.map(o => o.orderId === selectedOrder.orderId ? originalOrder : o);
        if (originalOrders)
        {
          setOrders(originalOrders as Order[]);
          setSelectOrder(originalOrder);
        }
    }   
    clearNewNotAddedOrderItem(setNewNotAddedOrderItem);
    setOriginalOrder(null);
  }

  function handelUpdateOrderDataInUi(updatedOrder: Order) {
    const updatedOrders = orders.map(order => {
      if (order.orderId === updatedOrder.orderId) {
        return updatedOrder;
      }
      return order;
    });
    setOrders(updatedOrders);
    setSelectOrder(updatedOrder);
  }

  async function handleDeleteExistingOrderClick(orderToDelete: Order) {
    await deleteOrder(orderToDelete.orderId);
    
    const result: { pagedOrders: Order[]; totalCount: number } = await fetchOrders(nameFilterText, 0);
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

  async function handleNewOrderSaveClick(newOrder: Order) {
    const { valid, messages } = validateOrder(newOrder);
    const errorMessage = getErrorMessage(messages);
    if (!valid) {
      alert(errorMessage);
      return;
    }

    const order = await saveOrder(newOrder, true);

    const result: { pagedOrders: Order[]; totalCount: number } = await fetchOrders(nameFilterText,	currentPage);
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

  function handleSetSelectedOrder(updatedOrder: Order) {
    setSelectOrder(updatedOrder);
  }

  async function handlePageClick(selectedItem: { selected: number }) {
    const selectedPage = selectedItem.selected;
    setCurrentPage(selectedPage);

    const result: { pagedOrders: Order[]; totalCount: number } = await fetchOrders(nameFilterText, selectedPage);
    setOrders(result.pagedOrders);
    setTotalCount(result.totalCount);
  }

  /////////////////////////////////////////
  // Functions to handle order items change
  /////////////////////////////////////////

  // This function is called when order items are added/updated/deleted
  function handleOrderItemsChange(orderWithUpdatedItems: Order) {
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

  function getErrorMessage(errors: string[]) {
    return errors.join("\n");
  }


  ////////////////////////////
  // Fetch data initially and on filter/page change
  ////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      const result: { pagedOrders: Order[]; totalCount: number } = await fetchOrders(nameFilterText, currentPage);
      setOrders(result.pagedOrders);

      if (selectedOrder !== null) {
        // If selected order was deleted or is not in the current page, and we are not adding new order, clear selection
        const selectedOrderIsInResult = result.pagedOrders.find(po => po.orderId === selectedOrder.orderId);
        if(!selectedOrderIsInResult && !isAddOrderMode) {
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
  }, [nameFilterText, currentPage, selectedOrder, isAddOrderMode]);

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

function clearSelectedOrder(setSelectOrder: (order: Order | null) => void) {
  setSelectOrder(
    { 
      clientId: 0,
      clientName: '',
      dateCreated: new Date(),
      dateModified: new Date(),
      orderId: 0, 
      orderItems: []
    } as Order);
}

function clearNewNotAddedOrderItem(setNewNotAddedOrderItem: (item: OrderItem) => void) {
  setNewNotAddedOrderItem({
    productId: 0,
    quantity: 0,
    unitPrice: 0
  } as OrderItem);
}

