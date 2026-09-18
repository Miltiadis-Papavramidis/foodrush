/* ========= SHARED ADDRESS STORAGE ========= */

function getAddressesShared(){
  return JSON.parse(localStorage.getItem("addresses")) || {
    active: 0,
    list: []
  };
}

function saveAddressesShared(data){
  localStorage.setItem("addresses", JSON.stringify(data));
}

/* ========= PAGE: my-addresses.html ========= */

function loadMyAddresses(){
  const list = document.getElementById("myAddressList");
  if(!list) return;

  const data = getAddressesShared();
  list.innerHTML = "";

  if (!data.list.length) {
    list.innerHTML = "<p>Δεν έχεις αποθηκευμένες διευθύνσεις 📍</p>";
    return;
  }

  data.list.forEach((addr,index)=>{
    const isActive = index === data.active;

    const card = document.createElement("div");
    card.className = "address-card";

    card.innerHTML = `
      <div class="addr-main">
        <div class="addr-label">${addr.label}</div>
        <div class="addr-text">${addr.address}</div>
        ${isActive ? `<span class="badge">Ενεργή</span>` : ``}
      </div>

      <div class="addr-actions">
        <button onclick="setActiveAddressExternal(${index})">Επιλογή</button>
        <button class="danger" onclick="deleteAddressExternal(${index})">Διαγραφή</button>
      </div>
    `;

    list.appendChild(card);
  });
}

function setActiveAddressExternal(index){
  const data = getAddressesShared();
  data.active = index;
  saveAddressesShared(data);
  loadMyAddresses();
}

function deleteAddressExternal(index){
  if(!confirm("Να διαγραφεί η διεύθυνση;")) return;

  const data = getAddressesShared();
  data.list.splice(index,1);

  if(data.active === index) data.active = 0;
  if(data.active > index) data.active--;

  if(!data.list.length){
    localStorage.removeItem("addresses");
  }else{
    saveAddressesShared(data);
  }

  loadMyAddresses();
}

document.addEventListener("DOMContentLoaded", loadMyAddresses);

/* ========= NAV ========= */

function goToMyAddresses(){
  window.location.href = "my-addresses.html";
}