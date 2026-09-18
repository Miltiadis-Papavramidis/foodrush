document.addEventListener("DOMContentLoaded", () => {

  // όχι login
  if (!isLoggedIn()) {
    document.getElementById("login-blocker")?.classList.remove("hidden");
    document.body.classList.add("locked");
    return;
  }

  // login αλλά όχι address
  const data = getAddresses();
  if (!data.list.length) {
    document.getElementById("address-blocker")?.classList.remove("hidden");
    document.body.classList.add("locked");
    return;
  }

  // όλα ΟΚ
  document.getElementById("login-blocker")?.classList.add("hidden");
  document.getElementById("address-blocker")?.classList.add("hidden");
  document.body.classList.remove("locked");   // 🔥
});

function isLoggedIn() {
  return localStorage.getItem("userLoggedIn") === "true";
}