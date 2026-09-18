function authGuard() {
  const logged = localStorage.getItem("userLoggedIn");
  const blocker = document.getElementById("login-blocker");

  if (!logged) {
    if (blocker) blocker.classList.remove("hidden");
    document.body.classList.add("locked");
  } else {
    if (blocker) blocker.classList.add("hidden");
    document.body.classList.remove("locked");
  }
}