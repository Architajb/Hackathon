const ordersList = document.getElementById("ordersList");

async function fetchOrders() {
  const res = await fetch("http://localhost:5000/api/orders/pending");
  const orders = await res.json();

  ordersList.innerHTML = "";

  if (orders.length === 0) {
    ordersList.innerHTML = "<p>No pending orders.</p>";
    return;
  }

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <h3>${order.itemName}</h3>
      <p><strong>Vendor:</strong> ${order.vendorName}</p>
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <button onclick="updateOrder('${order._id}', 'accepted')">Accept</button>
      <button onclick="updateOrder('${order._id}', 'declined')">Decline</button>
    `;

    ordersList.appendChild(card);
  });
}

async function updateOrder(id, status) {
  await fetch(`http://localhost:5000/api/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  fetchOrders(); // refresh list
}

fetchOrders();
