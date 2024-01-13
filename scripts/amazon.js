import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const productsGrid = document.querySelector(".js-products-grid"); // in that we will render all of our products
const cartQuantityElement = document.querySelector(".js-cart-quantity");

let productsHTML = ""; // this will have all the html that we are going to dynamically generate
let timerId; //  for clearing the setTimer for "added" message after add to cart click

// looping products array to dynamically generate html for rendering
products.forEach((product) => {
  // products array is coming from 'products.js'
  productsHTML += `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src=${product.image}>
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart  js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
        product.id
      }">
        Add to Cart
      </button>
    </div>
  `;
});

productsGrid.innerHTML = productsHTML;

const jsAddToCartButtons = document.querySelectorAll(".js-add-to-cart");

function updateCartQuantity(htmlElment) {
  let cartQuantity = 0; // total items in the cart calculator
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  //DOM for cart total quantity
  htmlElment.textContent = cartQuantity;
}
function addedMessageTimer(productId) {
  clearTimeout(timerId); // clearing the previous timer

  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("added-to-cart-visible");

  timerId = setTimeout(() => {
    // remove the "Added" message after 2 seconds
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);
}
function handleAddToCartButtonClick(button) {
  // to find the id of the product related to the button we used html attribute 'data- '
  const { productId } = button.dataset; // destructured productId from button.dataset

  addToCart(productId);
  updateCartQuantity(cartQuantityElement); // dom of cart quantity

  // For 'added' message when adding items to cart
  addedMessageTimer(productId);
}

// selecting all of the 'add to cart' buttons
// and setting up click event listener on all of the 'add to cart' buttons

jsAddToCartButtons.forEach((button) =>
  button.addEventListener("click", () => handleAddToCartButtonClick(button))
);

// dom for indicating cart quantity upon page load
updateCartQuantity(cartQuantityElement);
