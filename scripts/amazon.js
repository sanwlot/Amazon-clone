const productsGrid = document.querySelector('.js-products-grid') // in that we will render all of our products
let productsHTML = '' // this will have all the html that we r going to dynamically generate

// looping products array to dynamically generate html for rendering
products.forEach((product) => {   // products array is coming from 'products.js'
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
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
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

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});


productsGrid.innerHTML = productsHTML

document.querySelectorAll('.js-add-to-cart') // selecting all of the 'add to cart' buttons
  .forEach(button => { // looping those selected buttons
    button.addEventListener('click', () => { // setting up click event listener on all of the 'add to cart' buttons
      const productId = button.dataset.productId // to find the id of the product related to the button we used html attribute 'data- '

      let matchingItem
      let quantityCounter = 0

      cart.forEach((item) => { // handling the case when same item is added to cart multiple times, thus incresing the quantity
        if (productId === item.productId) {
          matchingItem = item // first we find the matching item
        }
        // calculate the quantity of item
        quantityCounter += item.quantity 

      })

      if (matchingItem) { // If there is matching item then it will increase the quantity of item
        matchingItem.quantity++
      } else {
        cart.push({ // if not duplicate then it will push the new item object in the cart array
          productId: productId,
          quantity: 1
        })
      }    
      console.log(cart)
    })
  })