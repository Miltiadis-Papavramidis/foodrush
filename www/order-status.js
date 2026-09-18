// 🗺️ Map – Θεσσαλονίκη
const map = L.map("map").setView([40.6401, 22.9444], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

// 📍 Κατάστημα
const storeMarker = L.marker([40.6425, 22.9388])
  .addTo(map)
  .bindPopup("Κατάστημα");

// 🏠 Χρήστης
const userMarker = L.marker([40.6352, 22.9512])
  .addTo(map)
  .bindPopup("Παράδοση");

// 🛵 Icon ντελιβερά
const courierIcon = L.icon({
  iconUrl: "scooter.png", // βάλε εικόνα
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// 🛵 Ντελιβεράς (αρχική θέση στο κατάστημα)
let courierPos = [40.6425, 22.9388];
const courierMarker = L.marker(courierPos, { icon: courierIcon }).addTo(map);

// 🚚 Διαδρομή
const route = [
  [40.6425, 22.9388],
  [40.6418, 22.9405],
  [40.6409, 22.9430],
  [40.6395, 22.9460],
  [40.6378, 22.9485],
  [40.6352, 22.9512]
];

// 🟢 Γραμμή διαδρομής
L.polyline(route, {
  color: "#00c853",
  weight: 4
}).addTo(map);

// 🧠 Status στοιχεία
const statusTitle = document.getElementById("orderStatusTitle");
const statusText = document.getElementById("orderStatusText");

statusTitle.textContent = "Η παραγγελία ετοιμάζεται 🍳";
statusText.textContent = "Το κατάστημα προετοιμάζει την παραγγελία σου";

// ▶️ Κίνηση
let step = 0;

const interval = setInterval(() => {
  if (step >= route.length) {
    clearInterval(interval);
    statusTitle.textContent = "Η παραγγελία παραδόθηκε 🎉";
    statusText.textContent = "Καλή όρεξη!";
    return;
  }

  courierMarker.setLatLng(route[step]);
  map.panTo(route[step], { animate: true, duration: 1 });

  // 🔄 Status αλλαγές
  if (step === 1) {
    statusTitle.textContent = "Ο ντελιβεράς ξεκίνησε 🛵";
    statusText.textContent = "Εκτιμώμενος χρόνος: 18 λεπτά";
  }

  if (step === 3) {
    statusText.textContent = "Ο ντελιβεράς είναι κοντά σου 📍";
  }

  step++;
}, 1500);
