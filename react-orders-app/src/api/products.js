// Gets a list of all products from the API
export async function getProducts() {
  const response = await fetch("http://localhost:5248/api/products", {
    method: "GET",
    headers: { "Accept": "application/json" }
  });
  if(!response.ok) throw new Error("Network response was not ok");
  return response.json();
}