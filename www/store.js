document.addEventListener("DOMContentLoaded", () => {

  if (!document.querySelector(".store-card")) return;

  /* ================= SLIDESHOW ================= */
  const slides = document.querySelectorAll("#slideshow img");
  let currentIndex = 0;

  if (slides.length > 0) {
    slides.forEach((img, i) => {
      img.style.display = i === 0 ? "block" : "none";
    });

    setInterval(() => {
      slides[currentIndex].style.display = "none";
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].style.display = "block";
    }, 4000);
  }

  /* ================= STORE CARD CLICK ================= */
  const storeCards = document.querySelectorAll(".store-card");

  storeCards.forEach(card => {
    card.addEventListener("click", () => {
      const storeId = card.dataset.store;
      if (!storeId) return;

      window.location.href = `store-page.html?store=${storeId}`;
    });
  });

});
