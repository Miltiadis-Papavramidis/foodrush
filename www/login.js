const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const toggleBtn = document.getElementById("toggleBtn");
const formTitle = document.getElementById("formTitle");
const message = document.getElementById("loginMessage");
const homeBtn = document.getElementById("homeBtn");

/* ================= TOGGLE FORMS ================= */
toggleBtn.addEventListener("click", () => {
  const isRegister = !registerForm.classList.contains("hidden");

  registerForm.classList.toggle("hidden", isRegister);
  loginForm.classList.toggle("hidden", !isRegister);

  formTitle.textContent = isRegister ? "Σύνδεση" : "Εγγραφή";
  toggleBtn.textContent = isRegister
    ? "Ή κάνε Εγγραφή"
    : "Ή κάνε Σύνδεση";

  message.textContent = "";
});

/* ================= REGISTER ================= */
registerForm.addEventListener("submit", e => {
  e.preventDefault();

  const user = {
    id: Date.now(),
    fullname: regUsername.value.trim(),
    email: regEmail.value.trim(),
    password: regPassword.value,
    createdAt: new Date().toISOString()
  };

  // save user
  localStorage.setItem("user", JSON.stringify(user));

  // success
  message.textContent = "✅ Εγγραφή επιτυχής!";
  message.style.color = "green";

  // auto login + redirect
  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
});

/* ================= LOGIN ================= */
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    message.textContent = "❌ Δεν υπάρχει χρήστης. Κάνε εγγραφή πρώτα.";
    message.style.color = "red";
    return;
  }

  if (
    loginEmail.value === savedUser.email &&
    loginPassword.value === savedUser.password
  ) {
    // auto login
    localStorage.setItem("user", JSON.stringify(savedUser));

    message.textContent = `🎉 Καλωσήρθες ${savedUser.fullname}!`;
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  } else {
    message.textContent = "❌ Λάθος email ή κωδικός.";
    message.style.color = "red";
  }
});

/* ================= HOME ================= */
homeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

/* ================= TOGGLE PASSWORD ================= */
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
}
