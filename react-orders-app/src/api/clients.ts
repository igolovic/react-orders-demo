// Gets a list of all clients from the API
export async function getClients() {
  const response = await fetch("http://localhost:5248/api/clients", {
    method: "GET",
    headers: { "Accept": "application/json" }
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}