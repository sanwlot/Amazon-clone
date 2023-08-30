export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1
    }
]

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

// to update cartItem quantity when inputed in the checkout
export function updateQuantity(productId, newQuantity) {
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity
      saveToStorage()
    }
  })
}

export function addToCart(productId) {
    let matchingItem;
    const selectInput = document.querySelector(`.js-quantity-selector-${productId}`);
  
    cart.forEach((cartItem) => { 
      if (productId === cartItem.productId) {
        matchingItem = cartItem; // first we find the matching item
      }
    });
  
    if (matchingItem) { // If there is matching item then it will increase the quantity of item
      matchingItem.quantity += Number(selectInput.value); // adding quantity according to 'select' input value even when it is duplicate item
    } else {
      cart.push({ // if not duplicate then it will push the new item object in the cart array
        productId,
        quantity: Number(selectInput.value), // it addes quantity to the cart array according to the 'select' input's value
      });
    }
    saveToStorage()
  }


export function removeFromCart(productId) {
  let newCart = []

  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })

  cart = newCart

  saveToStorage()
}