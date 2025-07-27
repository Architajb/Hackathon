const form = document.getElementById("itemForm");
const itemsList = document.getElementById("itemsList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", document.getElementById("itemName").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("quantity", document.getElementById("quantity").value);
  formData.append("image", document.getElementById("image").files[0]);

  const res = await fetch("http://localhost:5000/api/items", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    alert("Item added");
    form.reset();
    loadItems();
  } else {
    alert("Failed to add item");
  }
});

async function loadItems() {
  const res = await fetch("http://localhost:5000/api/items");
  const data = await res.json();
  itemsList.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <img src="http://localhost:5000/${item.image}" alt="${item.name}" />
      <h4>${item.name}</h4>
      <p>Price: ₹${item.price}</p>
      <p>Qty: ${item.quantity}</p>
      <button onclick="deleteItem('${item._id}')">Delete</button>
    `;

    itemsList.appendChild(card);
  });
}

async function deleteItem(id) {
  if (!confirm("Delete this item?")) return;
  await fetch(`http://localhost:5000/api/items/${id}`, { method: "DELETE" });
  loadItems();
}

window.onload = loadItems;
