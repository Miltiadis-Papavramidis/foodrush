document.addEventListener("DOMContentLoaded", renderLastOrder);

function renderLastOrder(){
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  if(!order) return;

  document.getElementById("last-order-section").classList.remove("hidden");

  document.getElementById("lastOrderStore").textContent = order.store || "Κατάστημα";
  document.getElementById("lastOrderTotal").textContent = order.total.toFixed(2)+"€";
  document.getElementById("lastOrderTime").textContent = new Date(order.createdAt).toLocaleString();

  const statusEl = document.getElementById("lastOrderStatus");
  statusEl.textContent = order.status || "Σε εξέλιξη";
}

/* ===== REORDER ===== */
function reorderLast(){
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  if(!order) return;

  localStorage.setItem("cart", JSON.stringify(order.cart));
  window.location.href = "cart.html"; // ή checkout.html αν θες direct
}

/* ===== RECEIPT ===== */
function openLastReceipt(){
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  if(!order) return;

  let items = order.cart.map(i=>`<li>${i.name} × ${i.quantity} - ${(i.price*i.quantity).toFixed(2)}€</li>`).join("");

  const win = window.open("", "_blank");
  win.document.write(`
    <html><body style="font-family:Arial;padding:20px">
      <h2>FoodRush</h2>
      <p>Order ID: ${order.id}</p>
      <p>${new Date(order.createdAt).toLocaleString()}</p>
      <hr>
      <ul>${items}</ul>
      <hr>
      <h3>Σύνολο: ${order.total.toFixed(2)}€</h3>
    </body></html>
  `);
}
