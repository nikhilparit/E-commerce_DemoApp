// src/context/CartContext.js
import React, { createContext, useState, useContext } from "react";

// Create Context
const CartContext = createContext();

// Hook to use Cart Context
export const useCart = () => useContext(CartContext);

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Stores cart items

  // Function to add item to cart
  const addToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  // Function to remove an item from cart
  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to clear the cart (used after order completion)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
