document.addEventListener("DOMContentLoaded", () => {

  if (!document.getElementById("productsGrid")) return;

  /* ================= STORES DATA ================= */
  const storesData = {
    burgerHouse: {
      name: "Burger House",
      img: "imgs burgerHouse/patrick-perkins-UPQHac_U_Lg-unsplash.jpg",
      hours: "Δευ–Κυρ: 11:00–22:00",
      products: [
        { name: "Cheese Burger", price: "€6", img: "imgs burgerHouse/amirali-mirhashemian-MocvvWyzNzQ-unsplash.jpg" },
        { name: "French Fries", price: "€2", img: "imgs burgerHouse/abhishek-hajare-QHE-BP6QcOE-unsplash.jpg" },
        { name: "Cola", price: "€1.5", img: "imgs burgerHouse/artem-beliaikin-jlWoIsNTKjA-unsplash.jpg" },
        { name: "Chicken Nuggets", price: "€4", img: "imgs burgerHouse/tyson-e7yjYr8GxN0-unsplash.jpg" },
        { name: "Milkshake", price: "€3", img: "imgs burgerHouse/victor-rutka-4FujjkcI40g-unsplash.jpg" }
      ]
    },

    pizzaRoma: {
      name: "Pizza Roma",
      img: "imgs pizzaRoma/pizza-margarita-with-shrimps-table.jpg",
      hours: "Δευ–Κυρ: 10:00–23:00",
      products: [
        { name: "Margherita", price: "€7", img: "imgs pizzaRoma/rashed-moslem-F76OhvaAYvQ-unsplash.jpg" },
        { name: "Pepperoni", price: "€8", img: "imgs pizzaRoma/david-foodphototasty-xIqVfW8XUt4-unsplash.jpg" },
        { name: "Special", price: "€9", img: "imgs pizzaRoma/vegetarian-pizza-with-zucchini-tomato-peppers-mushrooms-wooden-table.jpg" },
        { name: "Garlic Bread", price: "€3", img: "imgs pizzaRoma/sandevil-sandh-BRMvT4sw-4c-unsplash.jpg" },
        { name: "Soda", price: "€1.5", img: "imgs pizzaRoma/chris-vanhove-Cu3LwxsKpvw-unsplash.jpg" },
        { name: "Tiramisu", price: "€4", img: "imgs pizzaRoma/jay-gajjar-lGIXXpeERSM-unsplash.jpg" }
      ]
    },

   coffeeLab: {
        name: "Coffee Lab",
        img: "imgs coffeeLab/philip-nestor-V5QPmsIlcTI-unsplash.jpg",
        hours: "Δευ–Κυρ: 08:00–20:00",
        products: [
            {name:"Cappuccino", price:"€3", img:"imgs coffeeLab/anubhav-arora-RFLDagtOsMM-unsplash.jpg"},
            {name:"Latte", price:"€3.5", img:"imgs coffeeLab/billy-kwok-vfiA7rRtjWo-unsplash.jpg"},
            {name:"Espresso", price:"€2.5", img:"imgs coffeeLab/nathan-dumlao-H7ETDzUFooQ-unsplash.jpg"},
            {name:"Hot Chocolate", price:"€4", img:"imgs coffeeLab/elena-leya-NtmNhrdfs-o-unsplash.jpg"},
            {name:"Croissant", price:"€2", img:"imgs coffeeLab/personalgraphic-com-VzUE5RtCuBA-unsplash.jpg"}
        ]
    },

    souvlakiKing: {
      name: "Souvlaki King",
      img: "imgs souvlakiKing/closeup-shot-barbequed-meat-glass-wine-near-fireplace.jpg",
      hours: "Δευ–Κυρ: 11:00–22:00",
      products: [
        { name: "Chicken Souvlaki", price: "€4.5", img: "imgs souvlakiKing/top-view-grilled-chicken-skewers-with-vegetables.jpg" },
        { name: "Pork Souvlaki", price: "€5", img: "imgs souvlakiKing/turkey-kebabs-with-mustard-sauce.jpg" },
        { name: "Gyro Plate", price: "€6", img: "imgs souvlakiKing/chicken-doner-kebab-vegetables.jpg" },
        { name: "French Fries", price: "€2", img: "imgs souvlakiKing/f62ef704-d32c-45c1-ae6b-99dd84cd712f.jpg" },
        { name: "Coke", price: "€1.5", img: "imgs souvlakiKing/d8e1f747-9d46-4acd-8f8c-ecb07d08d37c.jpg" }
      ]
    },

    donutHeaven: {
      name: "Donut Heaven",
      img: "imgs donutHeaven/pexels-igor-ovsyannykov-56123-205961.jpg",
      hours: "Δευ–Κυρ: 09:00–21:00",
      products: [
        { name: "Glazed Donut", price: "€1.5", img: "imgs donutHeaven/delicious-donuts-with-topping-arrangement.jpg" },
        { name: "Chocolate Donut", price: "€2", img: "imgs donutHeaven/chocolate-coated-donut-displayed-marble-surface.jpg" },
        { name: "Sprinkles Donut", price: "€2", img: "imgs donutHeaven/pexels-punttim-867452.jpg" },
        { name: "Bubble Tea", price: "€3", img: "imgs donutHeaven/pexels-rdne-6413654.jpg" }
      ]
    },

    healthyBites: {
      name: "Healthy Bites",
      img: "imgs healthyBites/food-4801581_1280.jpg",
      hours: "Δευ–Κυρ: 10:00–20:00",
      products: [
        { name: "Salad Bowl", price: "€5", img: "imgs healthyBites/pexels-burakeroglu3-35479268.jpg" },
        { name: "Smoothie", price: "€4", img: "imgs healthyBites/pexels-joshsorenson-990439.jpg" },
        { name: "Avocado Toast", price: "€6", img: "imgs healthyBites/toast-7009956_1280.jpg" },
        { name: "Fruit Bowl", price: "€3.5", img: "imgs healthyBites/fresh-fruits-2305192_1280.jpg" },
        { name: "Herbal Tea", price: "€2", img: "imgs healthyBites/tea-1869721_1280.jpg" }
      ]
    }
  };

  /* ================= URL ================= */
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get("store");
  const store = storesData[storeId];

  if (!store) {
    alert("Το κατάστημα δεν βρέθηκε");
    return;
  }

  /* ================= STORE INFO ================= */
  document.getElementById("storeImage").src = store.img;
  document.getElementById("storeName").textContent = store.name;

  /* ================= FAVORITES ================= */
const favoriteBtn = document.getElementById("favoriteBtn");

const getFavorites = () =>
  JSON.parse(localStorage.getItem("favorites")) || [];

const updateHeart = () => {
  const favs = getFavorites();
  favoriteBtn.classList.toggle(
    "active",
    favs.some(s => s.id === storeId)
  );
};

window.toggleFavorite = () => {
  let favs = getFavorites();

  const exists = favs.find(s => s.id === storeId);

  if (exists) {
    favs = favs.filter(s => s.id !== storeId);
  } else {
    favs.push({
      id: storeId,          // ✅ ΣΩΣΤΟ
      name: store.name,     // ✅
      image: store.img,     // ✅
      category: "store"     // ✅ ή βάλε ό,τι θες
    });
  }

  localStorage.setItem("favorites", JSON.stringify(favs));
  updateHeart();
};

// αρχικό state
updateHeart();
  window.goToInfo = () => {
  window.location.href = `info.html?store=${storeId}`;
  };

  /* ================= PRODUCTS ================= */
  const productsGrid = document.getElementById("productsGrid");
  productsGrid.innerHTML = "";

  store.products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>${product.price}</p>
      <button
  class="add-to-cart"
  data-store="${storeId}"
  data-name="${product.name}"
  data-price="${product.price.replace("€", "")}"
  data-img="${product.img}">
  Προσθήκη στο καλάθι
</button>
    `;

    productsGrid.appendChild(card);
  });

});
