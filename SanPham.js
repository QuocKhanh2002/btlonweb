let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
    {id: 1, name:"Iphone 14PRM", image:"Iphone14PRM.png", price: 22000000},
    {id: 2, name:"Iphone 15PRM", image:"Iphone15PRM.png", price: 28000000},
    {id: 3, name:"Iphone 13PRM", image:"Iphone13PRM.png", price: 16000000},
    {id: 4, name:"Iphone 12PRM", image:"Iphone12PRM.png", price: 12000000},
    {id: 5, name:"Iphone 11PRM", image:"Iphone11PRM.png", price: 10000000},
    {id: 6, name:"Iphone 11", image:"Iphone11.png", price: 8000000},
    {id: 7, name:"Iphone 8", image:"Iphone8.png", price: 5000000},
    {id: 8, name:"IphoneXR", image:"IphoneXR.png", price: 8000000},
    {id: 9, name:"IphoneXSM", image:"IphoneXSM.png", price: 9000000},
];

let listCards = JSON.parse(localStorage.getItem("listCards")) || [];

function initApp() {
  for (let key = 0; key < products.length; key++) {
    let value = products[key];
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="../img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Thêm vào giỏ hàng</button>`;
    list.appendChild(newDiv);
  }
}

initApp();

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = { ...products[key], quantity: 1 };
  } else {
    listCards[key].quantity += 1;
  }
  saveToLocalStorage();
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  for (let key = 0; key < listCards.length; key++) {
    let value = listCards[key];
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="../img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
      totalPrice += value.price * value.quantity;
      count += value.quantity;
    }
  }
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, newQuantity) {
  if (newQuantity <= 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = newQuantity;
  }
  saveToLocalStorage();
  reloadCard();
}

reloadCard();

function saveToLocalStorage() {
  localStorage.setItem("listCards", JSON.stringify(listCards));
}

// Lưu trạng thái ban đầu vào localStorage khi tải trang lần đầu
if (!localStorage.getItem("listCards")) {
  saveToLocalStorage();
}