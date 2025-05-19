import React, { useState } from "react";
import { useCart } from "./CartContext";
import "./checkout.css";
import { useNavigate, useLocation } from "react-router-dom";

const platforms = [
  { name: "Steam", icon: "/assets/steam.png" },
  { name: "Xbox", icon: "/assets/xbox.png" },
  { name: "Epic Games", icon: "/assets/eg.png" },
];

const PASS_PRODUCT = {
  title: "PixelPass Subscription",
  price: "$5.00",
  description:
    "Unlock discount to certain games on PixelPass!",
};

const Checkout = () => {
  const { cartItems, calculateTotal, clearCart, currentUser } = useCart();
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const buyPass = location.state?.buyPass;

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  const handlePlaceOrder = () => {
    if (buyPass) {
      // Save subscription status
      if (currentUser) {
        localStorage.setItem(`pixelpass_sub_${currentUser.username}`, "true");
      }
      setOrderPlaced(true);
      return;
    }
    if (!selectedPlatform) return;
    setOrderPlaced(true);
    clearCart(); // Clear the cart after placing the order
    // Here you would send the order to your backend or process it
  };

  // PixelPass checkout flow
  if (buyPass) {
    if (orderPlaced) {
      return (
        <div className="checkout-container">
          <h2>Thank you for subscribing!</h2>
          <p>
            Your PixelPass is now active. Enjoy unlimited access to all games!
          </p>
          <button onClick={() => navigate("/profile")}>Back to Profile</button>
        </div>
      );
    }
    return (
      <div className="checkout-container">
        <h2>Subscribe to PixelPass</h2>
        <div
          className="checkout-cart-item"
          style={{ marginBottom: 24, background: "#2d0c57" }}
        >
          <div
            className="checkout-item-image"
            style={{ backgroundImage: `url(${PASS_PRODUCT.banner})` }}
          />
          <div className="checkout-item-details centered-details">
            <h3>{PASS_PRODUCT.title}</h3>
            <p>{PASS_PRODUCT.price}</p>
            <div style={{ color: "#e0d2ff", marginTop: 10 }}>{PASS_PRODUCT.description}</div>
          </div>
        </div>
        <div className="checkout-summary">
          <span>Total:</span>
          <span className="checkout-total">{PASS_PRODUCT.price}</span>
        </div>
        <button
          className="place-order-btn"
          onClick={handlePlaceOrder}
        >
          Subscribe Now
        </button>
      </div>
    );
  }

  // Standard cart checkout flow
  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <h2>Thank you for your order!</h2>
        <p>
          Your {selectedPlatform.name} keys will be sent to your email soon.
        </p>
        <button onClick={() => navigate("/dashboard")}>Back to Store</button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Your cart is empty.</h2>
        <button onClick={() => navigate("/dashboard")}>Back to Store</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-cart-items">
        {cartItems.map((item, idx) => (
          <div className="checkout-cart-item" key={idx}>
            <div
              className="checkout-item-image"
              style={{ backgroundImage: `url(${item.banner})` }}
            />
            <div className="checkout-item-details centered-details">
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="platform-section">
        <h3>Choose your platform:</h3>
        <div className="platform-options">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              className={`platform-btn ${
                selectedPlatform?.name === platform.name ? "selected" : ""
              }`}
              onClick={() => handlePlatformSelect(platform)}
            >
              <div className="platform-icon-wrapper">
                <img src={platform.icon} alt={platform.name} />
              </div>
              <span>{platform.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="checkout-summary">
        <span>Total:</span>
        <span className="checkout-total">${calculateTotal()}</span>
      </div>

      <button
        className="place-order-btn"
        onClick={handlePlaceOrder}
        disabled={!selectedPlatform}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;