/* ========= GLOBAL STORES LIST ========= */
/* ΟΛΑ τα καταστήματα (ακόμα κι αυτά που
   ΔΕΝ εμφανίζονται στην αρχική) */
document.addEventListener("DOMContentLoaded", () => {

  /* ================= ANIMATIONS ================= */
  const animatedElements = document.querySelectorAll(".animate");

  if (animatedElements.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => observer.observe(el));
  }

  /* ================= DARK THEME ================= */

  const toggleBtn = document.getElementById("themeToggle");

  if (toggleBtn) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }

  /* ================= SEARCH + CATEGORY FILTER ================= */
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const storeCards = document.querySelectorAll(".store-card");
  const categoryItems = document.querySelectorAll(".categories-section li");

  let activeCategory = null;

  if (!storeCards.length) return;

  // 🔎 Αναζήτηση
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      filterStores();
    });
  }

  // 🟢 Κατηγορίες
  categoryItems.forEach(item => {
    item.addEventListener("click", () => {
      categoryItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      activeCategory = item.dataset.category || null;
      filterStores();
    });
  });

  function filterStores() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  let visible = 0;

  storeCards.forEach(card => {
    const storeId = card.dataset.store || "";
    const storeName = card.querySelector("h4").textContent.toLowerCase();

    // 🔑 ΑΝ ΥΠΑΡΧΕΙ SEARCH → αγνόησε category
    const matchesCategory =
      query.length > 0 || !activeCategory || storeId === activeCategory;

    const matchesSearch =
      storeName.includes(query);

    if (matchesCategory && matchesSearch) {
      card.classList.remove("hidden-store");
      card.style.display = "";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  showNoResults(visible);
}

  /* ================= NO RESULTS ================= */
  function showNoResults(count) {
    let msg = document.getElementById("noResultsMsg");

    if (!msg) {
      msg = document.createElement("p");
      msg.id = "noResultsMsg";
      msg.style.marginTop = "20px";
      msg.style.textAlign = "center";
      msg.style.color = "var(--gray)";
      document.querySelector(".stores-section")?.appendChild(msg);
    }

    msg.textContent = count === 0
      ? "❌ Δεν βρέθηκαν καταστήματα"
      : "";
  }
});

/* ================= AUTH HELPERS ================= */
function isLoggedIn() {
  return localStorage.getItem("userLoggedIn") === "true";
}

function goToLogin() {
  window.location.href = "login.html";
}

/* APP NAVIGATION TRANSITION */
document.addEventListener("DOMContentLoaded", () => {
  const transitionEl = document.getElementById("appTransition");

  if(!transitionEl) return;

  function navigate(url){
    transitionEl.classList.add("active");

    setTimeout(()=>{
      window.location.href = url;
    }, 550);
  }

  document.querySelectorAll("a").forEach(link=>{
    link.addEventListener("click", e=>{
      const href = link.getAttribute("href");

      if(
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel")
      ) return;

      e.preventDefault();
      navigate(href);
    });
  });
});

document.addEventListener("DOMContentLoaded", ()=>{
  const root = document.getElementById("pageRoot");
  if(root){
    requestAnimationFrame(()=> root.classList.add("show"));
  }
});