const dashboardOrders = document.getElementById("dashboardOrders");

async function fetchDashboardOrders() {
  const res = await fetch("http://localhost:5000/api/orders/all");
  const orders = await res.json();

  dashboardOrders.innerHTML = "";

  if (orders.length === 0) {
    dashboardOrders.innerHTML = "<p>No accepted or declined orders yet.</p>";
    return;
  }

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <h3>${order.itemName}</h3>
      <p><strong>Vendor:</strong> ${order.vendorName}</p>
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <p><strong>Status:</strong> <span class="${order.status}">${order.status.toUpperCase()}</span></p>
    `;

    dashboardOrders.appendChild(card);
  });
}

fetchDashboardOrders();
