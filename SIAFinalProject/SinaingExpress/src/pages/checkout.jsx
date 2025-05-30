import React, { useState } from "react";
import { useCart } from "./CartContext";
import "./checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, calculateTotal, clearCart, currentUser } = useCart(); // <-- add currentUser
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!currentUser || !currentUser.username) {
      alert("Please log in to place an order.");
      return;
    }
    const orderPayload = {
      userId: currentUser.username, // <-- use the logged-in user's username
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity || 1,
      })),
      total: Number(
        String(calculateTotal()).replace(/[^\d.]/g, "")
      ),
    };

    const response = await fetch("http://localhost:5003/api/orders/place", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    const data = await response.json();
    if (response.ok) {
      setOrderPlaced(true);
      clearCart();
    } else {
      alert("Order failed: " + (data.message || data.error));
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <h2>Thank you for your order!</h2>
        <p>
          Your order has been placed and sent to our kitchen queue!<br />
          Our team will prepare your order and a rider will deliver it to your doorstep soon.<br />
          Thank you for your patience!
        </p>
        <button
          className="checkout-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Store
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Your cart is empty.</h2>
        <button
          className="checkout-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Store
        </button>
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
              <p>
                ₱{(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                {" "}
                <span style={{ color: "#888", fontSize: "0.95em" }}>
                  ({item.quantity || 1} x ₱{parseFloat(item.price).toFixed(2)})
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <span>Total:</span>
        <span className="checkout-total">{calculateTotal()}</span>
      </div>
      <button
        className="checkout-btn"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;