export async function fetchOrders() {
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

  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    method: "GET",
    headers: { "Accept": "application/json" }
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}

export async function addOrder(order) {
  const baseUrl = "http://localhost:5248/api/orders";
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}