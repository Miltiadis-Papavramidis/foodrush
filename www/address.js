function isGreek(text) {
  return /^[\u0370-\u03FF\u1F00-\u1FFF0-9\s,.\-]+$/.test(text);
}

function notifyAddressChange() {
  // live update checkout αν υπάρχει
  if (typeof renderCheckoutAddress === "function") {
    renderCheckoutAddress();
  }
}

function getAddresses() {
  return JSON.parse(localStorage.getItem("addresses")) || {
    active: 0,
    list: []
  };
}

function saveAddresses(data) {
  localStorage.setItem("addresses", JSON.stringify(data));
  renderActiveAddress();
  appGuard();
  notifyAddressChange();
}

function renderActiveAddress() {
  const el = document.getElementById("active-address");
  if (!el) return;

  const data = getAddresses();
  if (!data.list.length) {
    el.textContent = "Ορίστε διεύθυνση";
    return;
  }

  el.textContent = data.list[data.active].address;
}

document.addEventListener("DOMContentLoaded", () => {
  renderActiveAddress();
  checkAddressBlocker();
});

function openAddressModal() {
  const modal = document.getElementById("addressModal");
  modal.classList.remove("hidden");

  document.getElementById("addressForm").classList.add("hidden");
    // 🔥 FORCE LIVE RENDER
  requestAnimationFrame(() => {
    renderAddressList();
  });
}

function closeAddressModal() {
  const modal = document.getElementById("addressModal");
  const data = getAddresses();

  // αν δεν υπάρχει καμία διεύθυνση → ΜΗΝ κλείνεις
  if (!data.list.length) return;

  modal.classList.add("hidden");
}

function renderAddressList() {
  const listEl = document.getElementById("addressList");
  if (!listEl) {
    console.warn("addressList δεν υπάρχει στο DOM");
    return;
  }

  const data = getAddresses();
  listEl.innerHTML = "";

  if (!data.list.length) {
    listEl.innerHTML = "<li>Δεν υπάρχουν αποθηκευμένες διευθύνσεις</li>";
    return;
  }

  data.list.forEach((addr, index) => {
    const isActive = index === data.active;

    listEl.innerHTML += `
      <li style="margin-bottom:10px;">
        <div onclick="setActiveAddress(${index})" style="cursor:pointer;">
          <strong>${addr.address}</strong><br>
          <small>${addr.label}${isActive ? " (ενεργή)" : ""}</small>
        </div>
        <button onclick="deleteAddress(${index})"
          style="margin-top:5px;background:#00b347;color:white;border:none;padding:5px 10px;border-radius:6px;">
          Διαγραφή
        </button>
      </li>
    `;
  });
}

function setActiveAddress(index) {
  const data = getAddresses();
  data.active = index;
  saveAddresses(data);
  closeAddressModal();
}

function addAddress() {
  const modal = document.getElementById("addressModal");
  modal.classList.remove("hidden");

  const label = newLabel.value.trim();
  const address = newAddress.value.trim();

  if (!isGreek(address)) {
  alert("❌ Παρακαλώ εισάγετε διεύθυνση μόνο στα ελληνικά");
  return;
}

  if (!label || !address) return;

  const data = getAddresses();

  const exists = data.list.some(
    a => a.address.toLowerCase() === address.toLowerCase()
  );

  if (exists) {
    alert("Αυτή η διεύθυνση υπάρχει ήδη 📍");
    return;
  }

  data.list.unshift({ label, address });
  data.active = 0;

  saveAddresses(data);

  // ⏱️ ΠΕΡΙΜΕΝΕ ΝΑ ΥΠΑΡΞΕΙ ΤΟ DOM
  setTimeout(() => {
    renderAddressList();
  }, 0);

  newLabel.value = "";
  newAddress.value = "";
}

function deleteAddress(index) {
  if (!confirm("Να διαγραφεί η διεύθυνση;")) return;

  const data = getAddresses();

  data.list.splice(index, 1);

  // αν διέγραψε την ενεργή
  if (data.active === index) {
    data.active = 0;
  }

  // αν διέγραψε πριν από την ενεργή
  if (data.active > index) {
    data.active--;
  }

  // αν ΔΕΝ υπάρχουν άλλες διευθύνσεις
  if (!data.list.length) {
    localStorage.removeItem("addresses");

    renderAddressList();     // 🔥 LIVE
    renderActiveAddress();   // 🔥 LIVE
    checkAddressBlocker();   // 🔥 LIVE

    document
      .getElementById("addressModal")
      ?.classList.add("hidden");

    return;
  }

  // αποθήκευση
  saveAddresses(data);

  // 🔥 LIVE ενημέρωση – ΧΩΡΙΣ κλείσιμο modal
  requestAnimationFrame(() => {
    setTimeout(() => {
  renderAddressList();
}, 0);
});
}

function checkAddressBlocker() {
  const blocker = document.getElementById("address-blocker");
  const data = getAddresses();

  if (!data.list.length) {
    blocker?.classList.remove("hidden");
    document.body.classList.add("locked");
  } else {
    blocker?.classList.add("hidden");
    document.body.classList.remove("locked");   // 🔥 ΣΗΜΑΝΤΙΚΟ
  }
}

function showAddressForm() {
 document.getElementById("addressForm").classList.remove("hidden");

  // ⚠️ ΤΩΡΑ το input ΥΠΑΡΧΕΙ στο DOM
  attachAutocomplete();
}

let controller;

async function searchAddress(q) {
  if (q.length < 3) return;

  if (controller) controller.abort();
  controller = new AbortController();

  const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=gr&q=${encodeURIComponent(q)}`;

  const res = await fetch(url, {
    headers: { "Accept-Language": "el" },
    signal: controller.signal
  });

  const data = await res.json();
  showSuggestions(data);
}

function showSuggestions(results) {
    const ul = document.getElementById("addressSuggestions");
  ul.innerHTML = "";

  results
    .filter(r => isGreek(r.display_name))
    .slice(0, 5)
    .forEach(r => {
      const li = document.createElement("li");
      li.textContent = r.display_name;
      li.onclick = () => selectAddress(r);
      ul.appendChild(li);
    });

  if (!ul.children.length) {
    ul.classList.add("hidden");
  } else {
    ul.classList.remove("hidden");
  }
}

function selectAddress(place) {
 if (!isGreek(place.display_name)) {
    alert("❌ Η διεύθυνση πρέπει να είναι στα ελληνικά");
    return;
  }

  document.getElementById("newAddress").value = place.display_name;
  document.getElementById("addressSuggestions").classList.add("hidden");
}

function attachAutocomplete() {
  const input = document.getElementById("newAddress");
  if (!input) return;

  input.oninput = (e) => {
    searchAddress(e.target.value);
  };
}

function appGuard() {
  const user = localStorage.getItem("user"); // από user-system.js
  const addresses = getAddresses();

  const loginBlocker = document.getElementById("login-blocker");
  const addressBlocker = document.getElementById("address-blocker");

  // reset όλα
  if (loginBlocker) loginBlocker.classList.add("hidden");
  if (addressBlocker) addressBlocker.classList.add("hidden");
  document.body.classList.remove("locked");

  // 1️⃣ όχι login
  if (!user) {
    if (loginBlocker) loginBlocker.classList.remove("hidden");
    return;
  }

  // 2️⃣ login αλλά όχι διεύθυνση
  if (!addresses.list.length) {
    if (addressBlocker) addressBlocker.classList.remove("hidden");
    return;
  }
  // 3️⃣ όλα ΟΚ → app ελεύθερο
}

document.addEventListener("DOMContentLoaded", appGuard);

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("addresses");

  resetAppUI();
  appGuard();   // 🔥 ξαναμπαίνει στο flow
}

function resetAppUI() {
  // κλείσε modals
  document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));

  // κλείσε menus
  document.getElementById("userSideMenu")?.classList.add("hidden");

  // reset blockers
  document.getElementById("login-blocker")?.classList.add("hidden");
  document.getElementById("address-blocker")?.classList.add("hidden");

  // body state
  document.body.classList.remove("locked");

  // reset UI στοιχεία
  const addr = document.getElementById("active-address");
  if (addr) addr.textContent = "—";

  const cart = document.getElementById("cart-count");
  if (cart) cart.textContent = "0";
}
