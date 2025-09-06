import { PAGE_SIZE } from "../constants";

export async function fetchOrders(filter, pageIndex) {
  const pageSize = PAGE_SIZE;
  const sortColumn = "DateCreated";
  const sortDirection = "DESC";
  const baseUrl = "http://localhost:5248/api/orders/paged";

  const params = new URLSearchParams({
    pageIndex,
    pageSize,
    sortColumn,
    sortDirection,
    filter
  });

  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    method: "GET",
    headers: { "Accept": "application/json" }
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}

export async function saveOrder(order, isNew) {
  const baseUrl = "http://localhost:5248/api/orders";
  const method = isNew ? "POST" : "PUT";
  const url = isNew ? baseUrl : `${baseUrl}/${order.orderId}`;
  const response = await fetch(url, {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}

export async function deleteOrder(orderId){
  const baseUrl = "http://localhost:5248/api/orders";
  const response = await fetch(`${baseUrl}/${orderId}`, {
    method: "DELETE",
    headers: { "Accept": "application/json" }
  });
  if (!response.ok) throw new Error("Network response was not ok");
}