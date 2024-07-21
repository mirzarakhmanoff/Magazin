const skeleton = document.querySelector(".skeleton");
const wrappers = document.querySelector(".product__wrappers");
const btn = document.querySelector(".product__btn");
const collection = document.querySelector(".collection");
const navBtn = document.querySelector(".nav__btn");
const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");

const USER_API = "https://dummyjson.com";

let offSet = 1;
let count = 6;

async function getProducts(api, limit, category) {
  let response = await fetch(`${api}/products${category}?limit=${limit}`);
  response
    .json()
    .then((res) => createCard(res.products))
    .catch((err) => err)
    .finally(() => {
      skeleton.style.display = "none";
    });
}
getProducts(USER_API, count, "");

function createCard(products) {
  while (wrappers.firstChild) {
    wrappers.firstChild.remove();
  }
  products.forEach((e) => {
    let card = document.createElement("div");
    card.classList.add("wrapper");
    card.innerHTML = ` <div class="smart__img">
    <img src=${e.images[0]} alt="" />
  </div>
  <div>
    <p class="img__heading">${e.title}</p>
    <img class="stars" src="./pictures/stars.svg" alt="" />
    <div>
      <s class="strike">${e.price - 5}</s>
      <b class="bold">${e.price}</b>
    </div>
  </div>`;
    wrappers.appendChild(card);
  });
}

btn.addEventListener("click", () => {
  offSet++;
  getProducts(USER_API, offSet * count, "");
});

async function getCategories(api) {
  let response = await fetch(`${api}/products/category-list?limit=10`);
  response
    .json()
    .then((res) => createCategories(res))
    .catch((err) => console.error(err));
}
getCategories(USER_API);

function createCategories(categories) {
  categories.forEach((e) => {
    let addCategory = document.createElement("li");
    addCategory.classList.add("data-button");
    addCategory.innerHTML = `
        <data value="/category/${e}">${e}</data>
      `;
    collection.appendChild(addCategory);
  });
}

collection.addEventListener("click", (e) => {
  if (e.target.tagName === "DATA") {
    let val = e.target.value;
    getProducts(USER_API, count, val);
  }
});

navBtn.addEventListener("click", () => {
  toggle.classList.toggle("hidden");
  toggle.classList.toggle("flex");
});
