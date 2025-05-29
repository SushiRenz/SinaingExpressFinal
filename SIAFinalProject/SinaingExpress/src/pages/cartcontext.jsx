import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CART_API = "http://localhost:5002/api/cart";

export const CartProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (currentUser) {
        try {
          const res = await axios.get(`${CART_API}/${currentUser.username}`);
          setCartItems(res.data.items || []);
        } catch (err) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, [currentUser]);

  // Add or update item in cart
  const addToCart = async (item) => {
    if (!currentUser) {
      alert("Please log in to add items to your cart");
      return false;
    }
    try {
      const res = await axios.post(`${CART_API}/add`, {
        userId: currentUser.username,
        productId: item.productId,
        name: item.title,
        price: parseFloat(item.price.replace(/[^\d.]/g, "")),
        quantity: item.quantity || 1,
        banner: item.banner // <-- add this
      });
      setCartItems(res.data.items);
      setIsCartOpen(true);
      return true;
    } catch (err) {
      alert("Failed to add to cart.");
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (index) => {
    if (!currentUser) return;
    const item = cartItems[index];
    try {
      const res = await axios.post(`${CART_API}/remove`, {
        userId: currentUser.username,
        productId: item.productId || item.title
      });
      setCartItems(res.data.items);
    } catch (err) {
      alert("Failed to remove item.");
    }
  };

  // Increase quantity
  const increaseQuantity = async (index) => {
    const item = cartItems[index];
    try {
      const res = await axios.post(`${CART_API}/add`, {
        userId: currentUser.username,
        productId: item.productId,
        name: item.name, // Use item.name
        price: item.price, // Already a number from backend
        quantity: 1,
        banner: item.banner
      });
      setCartItems(res.data.items);
    } catch (err) {
      alert("Failed to increase quantity.");
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (index) => {
    const item = cartItems[index];
    if (item.quantity <= 1) {
      await removeFromCart(index);
      return;
    }
    try {
      const res = await axios.post(`${CART_API}/add`, {
        userId: currentUser.username,
        productId: item.productId,
        name: item.name, // Use item.name
        price: item.price,
        quantity: -1,
        banner: item.banner
      });
      setCartItems(res.data.items);
    } catch (err) {
      alert("Failed to decrease quantity.");
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!currentUser) return;
    try {
      await axios.post(`${CART_API}/clear/${currentUser.username}`);
      setCartItems([]);
    } catch (err) {
      alert("Failed to clear cart.");
    }
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openCartSidebar = () => setIsCartOpen(true);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += (item.price || 0) * (item.quantity || 1);
    });
    return `₱${total.toFixed(2)}`;
  };

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    setCartItems([]);
  };

  const value = {
    cartItems,
    isCartOpen,
    currentUser,
    addToCart,
    removeFromCart,
    clearCart,
    toggleCart,
    openCartSidebar,
    calculateTotal,
    login,
    logout,
    increaseQuantity,
    decreaseQuantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;