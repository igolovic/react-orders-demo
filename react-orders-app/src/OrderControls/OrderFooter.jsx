import { useState } from 'react'
import { ADD_ORDER_MODE_STATUS_STARTED, ADD_ORDER_MODE_STATUS_ENDED_WITH_SAVE, ADD_ORDER_MODE_STATUS_ENDED_WITH_CANCEL } from '../constants' // Import constants for order

function OrderFooter({isAddOrderMode, selectedOrder, isEditOrderMode, onAddOrderClick}){

  const [newOrder, setNewOrder] = useState({
    clientName: '',
  });

  const isNewOrderBeingEdited = (isAddOrderMode && !isEditOrderMode && selectedOrder === null);

  function handleAddNewOrderClick() {
    onAddOrderClick(ADD_ORDER_MODE_STATUS_STARTED, newOrder);
  }

  function handleSaveNewOrderClick() {
    fetchAddOrder(newOrder);
    onAddOrderClick(ADD_ORDER_MODE_STATUS_ENDED_WITH_SAVE, newOrder);
  }

  function handleCancelNewOrderClick() {
    onAddOrderClick(ADD_ORDER_MODE_STATUS_ENDED_WITH_CANCEL, null);
  }

 function fetchAddOrder(order) {
  const baseUrl = "http://localhost:5248/api/orders";

  fetch(baseUrl, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Order added:", data);
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
  }

  return (
    <>
      <tr>
      <td></td>
      <td></td>
      <td><input type="text" defaultValue={newOrder.clientName} disabled={!isNewOrderBeingEdited} /></td>
        <td>
          {!isNewOrderBeingEdited
            &&
            <button onClick={() => handleAddNewOrderClick(true)} disabled={isEditOrderMode}>Add Order</button>
          }
          {isNewOrderBeingEdited
            &&
            <button onClick={() => handleSaveNewOrderClick(true)} disabled={isEditOrderMode}>Save new order</button>
          }
          {isNewOrderBeingEdited
            &&
            <button onClick={() => handleCancelNewOrderClick(false)}>Cancel</button>
          }
        </td>
      </tr>
    </>
  )
}

export default OrderFooter