/* CART.JS – CLEAN & FIXED */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* ================= ADD TO CART (EVENT DELEGATION) ================= */
document.addEventListener("click", e => {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  const product = {
    id: `${btn.dataset.store}-${btn.dataset.name}`,
    name: btn.dataset.name,
    price: parseFloat(btn.dataset.price),
    store: btn.dataset.store,
    img: btn.dataset.img,
    quantity: 1
  };

  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(product);
  }

  saveCart(cart);

  // UI feedback
  btn.classList.add("added");
  btn.textContent = "✔ Προστέθηκε";

  setTimeout(() => {
    btn.classList.remove("added");
    btn.textContent = "Προσθήκη στο καλάθι";
  }, 1200);
});

/* ================= CART COUNT ================= */
function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  badge.textContent = total;
  badge.style.display = total > 0 ? "inline-block" : "none";
}

document.addEventListener("DOMContentLoaded", updateCartCount);
