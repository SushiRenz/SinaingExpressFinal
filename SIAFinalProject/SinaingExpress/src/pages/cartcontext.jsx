import React, { useState, createContext, useContext, useEffect } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap your app and provide cart functionality
export const CartProvider = ({ children }) => {
  // State for current logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Get cart items from localStorage on initial load, scoped to current user
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (!savedUser) return [];
      const user = JSON.parse(savedUser);
      const savedCart = localStorage.getItem(`gameCart_${user.username}`);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart items to localStorage whenever they change or user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`gameCart_${currentUser.username}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  // Add an item to the cart
  const addToCart = (game) => {
    if (!currentUser) {
      alert("Please log in to add items to your cart");
      return false;
    }
    const itemExists = cartItems.some(item => item.title === game.title);
    if (!itemExists) {
      setCartItems([...cartItems, game]);
      setIsCartOpen(true);
      return true;
    } else {
      return false;
    }
  };

  // Remove an item from the cart
  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
    if (currentUser) {
      localStorage.setItem(`gameCart_${currentUser.username}`, JSON.stringify([]));
    }
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price;
    }, 0).toFixed(2);
  };

  // Login function to set current user
  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    const savedCart = localStorage.getItem(`gameCart_${user.username}`);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  };

  // Logout function to clear current user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCartItems([]);
  };

  // Cart context value
  const value = {
    cartItems,
    isCartOpen,
    currentUser,
    addToCart,
    removeFromCart,
    clearCart,
    toggleCart,
    calculateTotal,
    login,
    logout
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;