// Function to retrieve the cart from localStorage
function getCart() {
  const cart = JSON.parse(localStorage.getItem("aurora-cart")) || [];
  return cart;
}

// Function to save the cart to localStorage
function saveCart(cart) {
  localStorage.setItem("aurora-cart", JSON.stringify(cart));
}

// Function to update the cart count displayed on the page
function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// Function to add a product to the cart
function addToCart(product, quantity, size, color) {
  let cart = getCart();
  const existingItem = cart.find(
    (item) =>
      item.product.id === product.id &&
      item.size === size &&
      item.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity, size, color });
  }

  saveCart(cart);
  updateCartCount(); // Call this to update the count after adding
}

// Attach a listener to the DOMContentLoaded event to ensure the cart count is updated
// as soon as the page loads.
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // You would also need to ensure that any "add to cart" buttons
  // on other pages call the `addToCart` function to update the count.
});
