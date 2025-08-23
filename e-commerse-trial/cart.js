// cart.js
// This script contains all the logic for managing the shopping cart,
// including saving to and loading from local storage, and updating the UI.
// It is designed to be included on any page that needs cart functionality.

/**
 * Retrieves the current cart from local storage.
 * @returns {Array} An array of cart items, or an empty array if no cart exists.
 */
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("aurora-cart")) || [];
    return cart;
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    return [];
  }
}

/**
 * Saves the current cart array to local storage.
 * @param {Array} cart The cart array to save.
 */
function saveCart(cart) {
  try {
    localStorage.setItem("aurora-cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
}

/**
 * Updates the cart icon count in the header.
 */
function updateCartCount() {
  const cart = getCart();
  const cartCountElement = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

/**
 * Shows a temporary notification when an item is added to the cart.
 */
function showNotification() {
  const cartNotification = document.getElementById("cart-notification");
  if (cartNotification) {
    cartNotification.style.transform = "translate(-50%, 0)";
    setTimeout(() => {
      cartNotification.style.transform = "translate(-50%, 200%)";
    }, 3000);
  }
}

/**
 * Adds a product to the cart. If the product with the same size and color
 * already exists, it updates the quantity. Otherwise, it adds a new item.
 * @param {Object} product The product object to add.
 * @param {number} quantity The quantity to add.
 * @param {string} [size=null] The selected size.
 * @param {string} [color=null] The selected color.
 */
function addToCart(product, quantity, size = null, color = null) {
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
    // Store a simplified product object to avoid saving the entire Firestore document
    const productForCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
    };
    cart.push({ product: productForCart, quantity, size, color });
  }

  saveCart(cart);
  updateCartCount();
  showNotification();
}

// Attach the main functions to the global window object so they can be
// called from other scripts.
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;

// Initial update of the cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
