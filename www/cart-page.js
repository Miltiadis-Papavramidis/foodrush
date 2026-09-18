/* CART-PAGE.JS – FINAL VERSION */
let pendingRemoveIndex = null;

/* ========== RENDER CART ========== */
function renderCart() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("goToCheckoutBtn");

  if (!container || !totalEl) {
    console.warn("cartItems ή cartTotal δεν βρέθηκαν");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // άδειο καλάθι
  if (cart.length === 0) {
    container.innerHTML = "<p>Το καλάθι είναι άδειο.</p>";
    totalEl.textContent = "";
    if (checkoutBtn) checkoutBtn.style.display = "none";
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += (Number(item.price) || 0) * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
  <div class="cart-item-row">
    <img src="${item.img || "fallback.png"}" alt="${item.name}" class="cart-item-img">

    <div class="cart-item-info">
      <h4>${item.name}</h4>
      <p>${item.store}</p>
      <p>Τιμή: €${Number(item.price || 0).toFixed(2)}</p>

      <div class="qty-controls">
  <button class="qty-btn minus">−</button>
  <span class="qty-value">${item.quantity}</span>
  <button class="qty-btn plus">+</button>
</div>

      <div class="cart-actions">
        <button class="cart-store-btn">🏬 Επιστροφή στο κατάστημα</button>
        <button class="cart-remove-btn">🗑 Αφαίρεση</button>
      </div>
    </div>
  </div>
  <hr>
`;

const minusBtn = div.querySelector(".qty-btn.minus");
const plusBtn = div.querySelector(".qty-btn.plus");

minusBtn.addEventListener("click", () => {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
});

plusBtn.addEventListener("click", () => {
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
});

// 🔁 επιστροφή στο κατάστημα
div.querySelector(".cart-store-btn").addEventListener("click", () => {
  window.location.href = `store-page.html?store=${item.store}`;
});

    /* αφαίρεση */
    div.querySelector(".cart-remove-btn").addEventListener("click", () => {
      askRemoveProduct(index);
    });

    container.appendChild(div);
  });

  totalEl.innerHTML = `
  <div class="cart-total">
    <span class="label">Σύνολο</span>
    <span class="amount">€${total.toFixed(2)}</span>
  </div>
`;
  if (checkoutBtn) checkoutBtn.style.display = "block";
}

/* ========== REMOVE CONFIRM MODAL ========== */
function askRemoveProduct(index) {
  pendingRemoveIndex = index;
  document
    .getElementById("removeConfirmModal")
    ?.classList.remove("hidden");
}

function closeRemoveModal() {
  pendingRemoveIndex = null;
  document
    .getElementById("removeConfirmModal")
    ?.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const confirmBtn = document.getElementById("confirmRemoveBtn");
  if (!confirmBtn) return;

  confirmBtn.addEventListener("click", () => {
    if (pendingRemoveIndex === null) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(pendingRemoveIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    closeRemoveModal();
    renderCart();
  });
});

/* ========== CHECKOUT ========== */
function goToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const addressesData = JSON.parse(localStorage.getItem("addresses"));

  if (cart.length === 0) {
    alert("Το καλάθι σου είναι άδειο 🛒");
    return;
  }

  if (
    !addressesData ||
    !addressesData.list ||
    addressesData.list.length === 0 ||
    addressesData.active == null
  ) {
    alert("Πρέπει να επιλέξεις διεύθυνση παράδοσης 📍");
    openAddressModal();
    return;
  }

  const activeAddress = addressesData.list[addressesData.active];
  if (!activeAddress?.address) {
    alert("Πρέπει να επιλέξεις διεύθυνση παράδοσης 📍");
    openAddressModal();
    return;
  }

  window.location.href = "checkout.html";
}
