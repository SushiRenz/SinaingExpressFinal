import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const { cartItems, isCartOpen, removeFromCart, toggleCart, calculateTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart(); // Optionally close the cart sidebar
    navigate("/checkout");
  };

  return (
    <>
      {/* Cart sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button 
            className="close-cart" 
            onClick={toggleCart}
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="item-image" style={{ backgroundImage: `url(${item.banner})` }}></div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-price">{item.price}</p>
                </div>
                <button 
                  className="remove-item" 
                  onClick={() => removeFromCart(index)}
                  aria-label="Remove item"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-price">${calculateTotal()}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </div>

      {/* Overlay that appears behind the cart when it's open */}
      {isCartOpen && <div className="cart-overlay" onClick={toggleCart}></div>}
    </>
  );
};

export default Cart;