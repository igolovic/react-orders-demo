import { useEffect, useState } from 'react'
import { useFetchOrders, useSaveOrder, useDeleteOrder } from './hooks/useOrders'

import OrderTable from './OrderControls/OrderTable'
import OrderItemTable from './OrderItemControls/OrderItemTable'
import { getClients } from './api/clients'
// @ts-ignore: no declaration file for './api/products'
import { getProducts } from './api/products'
// @ts-ignore: no declaration file for './validation'
import { validateOrder } from './validation.ts'
// @ts-ignore: no declaration file for './App.css'
import './App.css'
import type {PagedOrderDto, OrderItemDto, ClientDto, ProductDto} from './types.ts'

function App(){
  const [orders, setOrders] = useState<PagedOrderDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [isAddOrderMode, setIsAddOrderMode] = useState(false);
  const [isEditOrderMode, setIsEditOrderMode] = useState(false);
  const [selectedOrder, setSelectOrder] = useState<PagedOrderDto | null>(null);
  const [newNotAddedOrderItem, setNewNotAddedOrderItem] = useState<OrderItemDto | null>(null);
  const [originalOrder, setOriginalOrder] = useState<PagedOrderDto | null>(null);
  const [nameFilterText, onSetNameFilterText] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, error, refetch } = useFetchOrders(nameFilterText, currentPage);
  const saveMutation = useSaveOrder();
  const deleteMutation = useDeleteOrder();

  //////////////////////////////////////////////////
  // Functions to handle order selection and editing
  //////////////////////////////////////////////////

  function handleEditExistingOrderClick(editedOrder: PagedOrderDto) {
    setIsAddOrderMode(false);
    setIsEditOrderMode(true);
    setSelectOrder(editedOrder);
    
    // Deep clone to avoid direct state mutation
    const clonedOrder = JSON.parse(JSON.stringify(editedOrder));
    setOriginalOrder(clonedOrder);
  }

  async function handleSaveExistingOrderClick(changedOrder: PagedOrderDto) {
    const { valid, messages } = validateOrder(changedOrder);
    const errorMessage = getErrorMessage(messages);
    if (!valid) {
      alert(errorMessage);
      return;
    }

    const order = await saveMutation.mutateAsync({ order: changedOrder, isNew: false });
    const refetchResult = await refetch();

    setOrders(refetchResult.data?.orders ?? []);
    setTotalCount(refetchResult.data?.totalCount ?? 0);

    setIsEditOrderMode(false);
    setIsAddOrderMode(false);

    const selectedOrderIsInResult = refetchResult.data?.orders?.find(po => po.orderId === order?.orderId);
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
          setOrders(originalOrders as PagedOrderDto[]);
          setSelectOrder(originalOrder);
        }
    }   
    clearNewNotAddedOrderItem(setNewNotAddedOrderItem);
    setOriginalOrder(null);
  }

  function handelUpdateOrderDataInUi(updatedOrder: PagedOrderDto) {
    const updatedOrders = orders.map(order => {
      if (order.orderId === updatedOrder.orderId) {
        return updatedOrder;
      }
      return order;
    });
    setOrders(updatedOrders);
    setSelectOrder(updatedOrder);
  }

  async function handleDeleteExistingOrderClick(orderToDelete: PagedOrderDto) {
  await deleteMutation.mutateAsync(orderToDelete.orderId);
  const refetchResult = await refetch();

  setOrders(refetchResult.data?.orders ?? []);
  setTotalCount(refetchResult.data?.totalCount ?? 0);

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

  async function handleNewOrderSaveClick(newOrder: PagedOrderDto) {
    const { valid, messages } = validateOrder(newOrder);
    const errorMessage = getErrorMessage(messages);
    if (!valid) {
      alert(errorMessage);
      return;
    }

    const order = await saveMutation.mutateAsync({ order: newOrder, isNew: true });
    const refetchResult = await refetch();
    setOrders(refetchResult.data?.orders ?? []);
    setTotalCount(refetchResult.data?.totalCount ?? 0);

    setIsAddOrderMode(false);

    const selectedOrderIsInResult = refetchResult.data?.orders?.find(po => po.orderId === order.orderId);
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

  function handleSetSelectedOrder(updatedOrder: PagedOrderDto) {
    setSelectOrder(updatedOrder);
  }

  async function handlePageClick(selectedItem: { selected: number }) {
    const selectedPage = selectedItem.selected;
    setCurrentPage(selectedPage);

    const refetchResult = await refetch();
    setOrders(refetchResult.data?.orders ?? []);
    setTotalCount(refetchResult.data?.totalCount ?? 0);
  }

  /////////////////////////////////////////
  // Functions to handle order items change
  /////////////////////////////////////////

  // This function is called when order items are added/updated/deleted
  function handleOrderItemsChange(orderWithUpdatedItems: PagedOrderDto) {
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

  //const { data, isLoading, error } = useOrders(nameFilterText, currentPage);
      useEffect(() => {
              if (data) {
                  setOrders(data.orders);
                  setTotalCount(data.totalCount);
  
                  if (selectedOrder !== null) {
                      // If selected order was deleted or is not in the current page, and we are not adding new order, clear selection
                      const selectedOrderIsInResult = data.orders.find(po => po.orderId === selectedOrder.orderId);
                      if (!selectedOrderIsInResult && !isAddOrderMode) {
                          setSelectOrder(null);
                      }
                  }
              }
              const asyncGetProductsAndClients = async () => {
                  const dbProducts = await getProducts();
                  setProducts(dbProducts);
                  const dbClients = await getClients();
                  setClients(dbClients);
              };
              asyncGetProductsAndClients();
      }
    , [data]);

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

function clearSelectedOrder(setSelectOrder: (order: PagedOrderDto | null) => void) {
  setSelectOrder(
    { 
      clientId: 0,
      clientName: '',
      dateCreated: new Date(),
      dateModified: new Date(),
      orderId: 0, 
      orderItems: []
    } as PagedOrderDto);
}

function clearNewNotAddedOrderItem(setNewNotAddedOrderItem: (item: OrderItemDto) => void) {
  setNewNotAddedOrderItem({
    productId: 0,
    quantity: 0,
    unitPrice: 0
  } as OrderItemDto);
}

