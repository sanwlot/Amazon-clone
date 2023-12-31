import { cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const checkoutQuantityEl = document.querySelector(".js-checkout-quantity");

let cartSummaryHTML = "";

cart.forEach(cartItem => {
  const productId = cartItem.productId;

  let matchingProduct;

  // normalizing the the data, to get other product information using productId
  products.forEach(product => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${
              matchingProduct.id
            }">
                <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src=${matchingProduct.image}>

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${productId}">${
                      cartItem.quantity
                    }</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id=${
                  matchingProduct.id
                }>
                    Update
                </span>
                <input class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${matchingProduct.id}>Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
                  matchingProduct.id
                }>
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    $9.99 - Shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        `;
});

// generated HTML using JS and rendered
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

function addIsEditingQuantityClass(link) {
  let productId = link.dataset.productId;
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.add("is-editing-quantity");
}
function handleSaveClick(link) {
  let productId = link.dataset.productId;
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove("is-editing-quantity");
  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`) 
  let newQuantity = Number(quantityInput.value)
  quantityInputLimit(newQuantity, productId)
  updateCheckoutQuantity(checkoutQuantityEl);
}
function handleQuantityInputOnEnter(event, link) {
  if (event.key === 'Enter') {
    let productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove("is-editing-quantity");
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
    let newQuantity = Number(quantityInput.value)
    quantityInputLimit(newQuantity, productId)
    updateCheckoutQuantity(checkoutQuantityEl);
  }
}
function deleteCartItem(link) {
  let productId = link.dataset.productId;

  removeFromCart(productId);
  updateCheckoutQuantity(checkoutQuantityEl);

  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.remove();
}
function updateCheckoutQuantity(htmlElment) {
  let cartQuantity = 0; // total items in the cart calculator
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  //DOM for cart total quantity
  htmlElment.textContent = `${cartQuantity} Items`;
}
function quantityInputLimit(newQuantity, productId) {
  if (newQuantity > 0 && newQuantity < 1000) {
    updateQuantity(productId, newQuantity) // imported from cart.js
    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)
    quantityLabel.textContent = newQuantity
  }
}

const jsUpdateLink = document.querySelectorAll(".js-update-link")
const saveQuantityLink = document.querySelectorAll(".save-quantity-link")
const jsQuantityInput = document.querySelectorAll(".js-quantity-input")
const jsDeleteLink = document.querySelectorAll(".js-delete-link")


// update item link
jsUpdateLink.forEach(link => link.addEventListener("click", () => addIsEditingQuantityClass(link)))

// save link
saveQuantityLink.forEach(link => link.addEventListener("click", () => handleSaveClick(link)))

// updating quantity by ENTER key in the 'quantity input'
jsQuantityInput.forEach(link => link.addEventListener("keypress", event => handleQuantityInputOnEnter(event, link)))

// delete cart item link
jsDeleteLink.forEach(link => link.addEventListener("click", () => deleteCartItem(link)) );

updateCheckoutQuantity(checkoutQuantityEl);
