function loadFavorites() {
  const grid = document.getElementById("favoritesGrid");
  const raw = localStorage.getItem("favorites");
  const favorites = raw ? JSON.parse(raw) : [];

  if (!favorites.length) {
    grid.innerHTML = "<p>Δεν έχεις αγαπημένα καταστήματα ακόμα ❤️</p>";
    return;
  }

  grid.innerHTML = "";

  favorites.forEach(store => {
    const card = document.createElement("div");
    card.className = "store-card";
    card.innerHTML = `
      <img src="${store.image}" alt="${store.name}">
      <h3>${store.name}</h3>
      <p>${store.category}</p>
    `;

    card.onclick = () => {
      window.location.href = `store-page.html?store=${store.id}`;
    };

    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadFavorites);

function goToFavorites(){
  window.location.href = "favorites.html";
}

function toggleFavorite(store) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.find(s => s.id === store.id);

  if (exists) {
    favorites = favorites.filter(s => s.id !== store.id);
  } else {
    favorites.push({
      id: store.id,
      name: store.name,
      image: store.image,
      category: store.category
    });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}
