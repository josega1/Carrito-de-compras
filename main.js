const baseUrl = "https://ecommercebackend.fundamentos-29.repl.co/";
const cartToggle = document.querySelector(".cart__toggle");
const cartBlock = document.querySelector(".cart__block");
const productsList = document.querySelector("#products-container");
const cart = document.querySelector("#cart");
const cartList = document.querySelector("#cart__list");
emptycartButton = document.querySelector("#empty__cart");
let cartProducts = [];
const modalContainer = document.querySelector("#modal-container");
const modalElement = document.querySelector("#modal");
let modalDetails = [];
const modalList = document.querySelector("#modal");
cartToggle.addEventListener("click", () => {
  cartBlock.classList.toggle("nav__cart__visible");
});
eventListenersLoader();
function eventListenersLoader() {
  productsList.addEventListener("click", addProduct);
  cart.addEventListener("click", deleteProduct);
  emptycartButton.addEventListener("click", emptycart);
  document.addEventListener("DOMContentLoaded", () => {
    cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    cartElementsHTML();
  });
  productsList.addEventListener("click", modalProduct);
  modalContainer.addEventListener("click", closeModal);
}
function getProducts() {
  axios
    .get(baseUrl)
    .then(function (response) {
      const products = response.data;
      printProducts(products);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getProducts();
function printProducts(products) {
  let html = "";
  for (let i = 0; i < products.length; i++) {
    html += `
    <div class='product__container'>
      <div class='product__container__img'>
        <img src="${products[i].image}" alt="image">
      </div>
      <div class="product__container__name">
        <p>${products[i].name}</p>
      </div>
      <div class="product__container__price">
        <p>$ ${products[i].price.toFixed(2)}</p>
      </div>
      <div class="product__container__description">
      <p>$ ${products[i].description}</p>
    </div>
      <div class="product__container__button">
        <button class="cart__button add__to__cart" id="add__to__cart" data-id="${
          products[i].id
        }">Add to cart</button>
        <button class="product__details" data-id="${
          products[i].id
        }">View Details</button>
      </div>
    </div>
    `;
  }
  productsList.innerHTML = html;
}
function addProduct(event) {
  if (event.target.classList.contains("add__to__cart")) {
    const product = event.target.parentElement.parentElement;

    cartProductsElements(product);
  }
}
function cartProductsElements(product) {
  const infoProduct = {
    id: product.querySelector("button").getAttribute("data-id"),
    image: product.querySelector("img").src,
    name: product.querySelector(".product__container__name p").textContent,
    price: product.querySelector(".product__container__price p").textContent,

    quantity: 1,
  };
  if (cartProducts.some((product) => product.id === infoProduct.id)) {
    const product = cartProducts.map((product) => {
      if (product.id === infoProduct.id) {
        product.quantity++;
        return product;
      } else {
        return product;
      }
    });
    cartProducts = [...product];
  } else {
    cartProducts = [...cartProducts, infoProduct];
  }
  cartElementsHTML();
}
function cartElementsHTML() {
  cartList.innerHTML = "";
  cartProducts.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="cart__product">
        <div class="cart__product__image">
          <img src="${product.image}">
        </div>
        <div class="cart__product__description">
          <p>${product.name}</p>
          <p>Precio: ${product.price}</p>
          <p>Cantidad: ${product.quantity}</p>
        </div>
        <div class="cart__product__button">
          <button class="delete__product" data-id="${product.id}">
            Delete
          </button>
        </div>
      </div>
      <hr>
    `;
    cartList.appendChild(div);
  });
  productsStorage();
}
function productsStorage() {
  localStorage.setItem("cart", JSON.stringify(cartProducts));
}
function deleteProduct(event) {
  if (event.target.classList.contains("delete__product")) {
    const productId = event.target.getAttribute("data-id");
    cartProducts = cartProducts.filter((product) => product.id !== productId);
    cartElementsHTML();
  }
}
function emptycart() {
  cartProducts = [];
  cartElementsHTML();
}
function modalProduct(event) {
  if (event.target.classList.contains("product__details")) {
    modalContainer.classList.add("show__modal");
    const product = event.target.parentElement.parentElement;
    modalDetailsElement(product);
    modalInfoElements();
  }
}
function closeModal(event) {
  if (event.target.classList.contains("icon__modal")) {
    modalContainer.classList.remove("show__modal");
    modalElement.innerHTML = "";
    modalDetails = [];
  }
}
function modalDetailsElement(product) {
  const infoDetails = [
    {
      id: product.querySelector("button").getAttribute("data-id"),
      image: product.querySelector("img").src,
      name: product.querySelector(".product__container__name p").textContent,
      price: product.querySelector(".product__container__price p").textContent,
      description: product.querySelector(".product__container__description p")
        .textContent,
    },
  ];
  modalDetails = [...infoDetails];
}
function modalInfoElements() {
  modalDetails.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="product__detail">
      <div>
        <div class="product__detail__image">
          <img src="${product.image}">
        </div>
      </div>
      <div class="characteristics">
        <div class="product__detail__name">
          <p>${product.name}</p>
        </div>
        <div class="product__detail__price">
          <p>Price: ${product.price}</p>
        </div>
        <div class="product__detail__description">
          <p>Description: ${product.description}</p>
        </div>
          <div class="size">
            <div>
              <p>S</p>
            </div>
            <div>
              <p>M</p>
            </div>
            <div>
              <p>L</p>
            </div>
            <div>
              <p>XL</p>
            </div>
            <div>
              <p>2XL</p>
            </div>
            <div>
              <p>3XL</p>
            </div>
          </div>
        </div>
      </div>
    `;
    modalList.appendChild(div);
  });
}
