/* =========================PROFILE CLICK HANDLER========================= */
function handleProfileClick() {
  const userRaw = localStorage.getItem("user");

  if (!userRaw) {
    openRegisterModal(); // login / register modal
    return;
  }

  openUserMenu();
}

/* =========================REGISTER========================= */
function openRegisterModal() {
  const modal = document.getElementById("registerModal");
  if (!modal) return;
  modal.classList.remove("hidden");
}

function closeRegisterModal() {
  const modal = document.getElementById("registerModal");
  if (modal) modal.classList.add("hidden");
}

/* =========================USER MENU========================= */
function openUserMenu() {
  const raw = localStorage.getItem("user");
  if (!raw) return;

  const user = JSON.parse(raw);

  const nameEl = document.getElementById("userFullname");
  const menuEl = document.getElementById("userSideMenu");

  if (!nameEl || !menuEl) return;

  nameEl.textContent = user.fullname;
  menuEl.classList.remove("hidden");
}

function closeUserMenu() {
  const menuEl = document.getElementById("userSideMenu");
  if (menuEl) menuEl.classList.add("hidden");
}

/* =========================AUTH ACTIONS========================= */
function logout() {
  closeUserMenu();
  window.location.href = "login.html";
}

function deleteAccount() {
  if (!confirm("Θες σίγουρα διαγραφή λογαριασμού;")) return;

  localStorage.clear();
  window.location.href = "login.html";
}
