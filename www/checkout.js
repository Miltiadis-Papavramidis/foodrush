document.addEventListener("DOMContentLoaded", () => {
  loadCheckout();
  renderCheckoutAddress();
});

/* ================= LOAD CHECKOUT ================= */
function loadCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemsContainer = document.querySelector(".checkout-items");
  const totalEl = document.querySelector("#checkout-total");

  if (!itemsContainer || !totalEl) return;

  itemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const qty = Number(item.quantity || 1);
    const price = Number(item.price || 0);
    const lineTotal = price * qty;
    total += lineTotal;

    const row = document.createElement("div");
    row.className = "checkout-item";
    row.innerHTML = `
      <span>${item.name} × ${qty}</span>
      <span>${lineTotal.toFixed(2)}€</span>
    `;

    itemsContainer.appendChild(row);
  });

  totalEl.textContent = total.toFixed(2) + "€";
}

/* ================= SUBMIT ORDER ================= */
function submitOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Το καλάθι είναι άδειο 🛒");
    return;
  }

  const activeAddress = getActiveAddress();
  if (!activeAddress) {
    alert("Πρέπει να επιλέξεις διεύθυνση παράδοσης 📍");
    return;
  }

  const activeMethod = document.querySelector(".pay-method.active")?.dataset.method || "cod";

  // 🧾 Fake card validation
  if(activeMethod === "card"){
    const num = document.getElementById("cardNumber")?.value.trim();
    const name = document.getElementById("cardName")?.value.trim();
    const exp = document.getElementById("cardExpiry")?.value.trim();
    const cvv = document.getElementById("cardCvv")?.value.trim();

    if(!num || !name || !exp || !cvv){
      alert("Συμπλήρωσε όλα τα στοιχεία κάρτας 💳");
      return;
    }
  }

  const order = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    address: activeAddress,
    payment: activeMethod,
    cart
  };

  console.log("ORDER:", order);

  // ⏳ Fake payment processing UI
  const payBtn = document.querySelector(".checkout-submit");
  payBtn.disabled = true;
  payBtn.textContent = "Επεξεργασία πληρωμής...";

setTimeout(()=>{

  // 🎉 Success overlay
  document.body.insertAdjacentHTML("beforeend",`
    <div class="success-overlay">
      <div class="success-box">
        <div class="check">✔</div>
        <h3>Η πληρωμή ολοκληρώθηκε</h3>
        <p>Η παραγγελία καταχωρήθηκε 🛵</p>
      </div>
    </div>
  `);

order.status = "preparing";

order.total = cart.reduce((s, i) => {
  const price = Number(i.price || 0);
  const qty = Number(i.quantity || 1);
  return s + (price * qty);
}, 0);

// 🔴 active order (τρέχουσα παραγγελία - live tracking)
localStorage.setItem("activeOrder", JSON.stringify(order));

// 🟢 last order (τελευταία παραγγελία για home card)
localStorage.setItem("lastOrder", JSON.stringify(order));

// 📚 history system
const orders = JSON.parse(localStorage.getItem("orders")) || [];
orders.push(order);
localStorage.setItem("orders", JSON.stringify(orders));

// 🧹 clear cart
localStorage.removeItem("cart");

// ⏩ redirect στο status page
setTimeout(()=>{
  window.location.href = "order-status.html";
},2000);

},2500);
}
/* ================= ACTIVE ADDRESS ================= */
function getActiveAddress() {
  const data = JSON.parse(localStorage.getItem("addresses"));

  if (
    !data ||
    !Array.isArray(data.list) ||
    data.list.length === 0 ||
    data.active == null
  ) {
    return null;
  }

  return data.list[data.active];
}

function renderCheckoutAddress() {
  const el = document.getElementById("checkout-address");
  if (!el) return;

  const data = JSON.parse(localStorage.getItem("addresses"));

  if (
    !data ||
    !data.list ||
    data.list.length === 0 ||
    data.active == null
  ) {
    el.textContent = "Δεν έχει επιλεγεί διεύθυνση";
    return;
  }

  const addr = data.list[data.active];

  el.innerHTML = `
    <strong>${addr.label || "Διεύθυνση"}</strong><br>
    ${addr.address}
  `;
}

// ===== Payment Toggle =====
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".pay-method").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".pay-method").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");

      const method = btn.dataset.method;
      document.getElementById("cardForm").style.display = 
        method === "card" ? "block" : "none";
    });
  });
});