export const cart = []

export function addToCart(productId) {
    let matchingItem;
    let quantityCounter = 0;
    // select input
    const selectInput = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
  
    cart.forEach((cartItem) => { // handling the case when same item is added to cart multiple times, thus incresing the quantity
      if (productId === cartItem.productId) {
        matchingItem = cartItem; // first we find the matching item
      }
      quantityCounter += cartItem.quantity; // calculate the quantity of item
    });
  
    if (matchingItem) { // If there is matching item then it will increase the quantity of item
      matchingItem.quantity += Number(selectInput.value); // adding quantity according to 'select' input value even when it is duplicate item
    } else {
      cart.push({ // if not duplicate then it will push the new item object in the cart array
        productId,
        quantity: Number(selectInput.value), // it addes quantity to the cart array according to the 'select' input's value
      });
    }
  
    console.log(cart)
  }