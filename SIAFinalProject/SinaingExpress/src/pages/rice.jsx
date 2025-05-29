import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rice.css";
import { useCart } from "./CartContext";

const API_URL = "http://localhost:5001/api/products"; // Use your backend

const MenuCarousel = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(""); // "left" or "right" for animation
  const { addToCart, openCartSidebar } = useCart();

  // Fetch products from backend
  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        // Map backend fields to carousel fields
        const mapped = res.data.map(prod => ({
          _id: prod._id, // <-- Make sure this is included!
          name: prod.name,
          price: `₱${prod.price}.00`,
          image: prod.imageUrl,
          description: prod.description,
          tags: prod.category ? [prod.category] : []
        }));
        setMenuItems(mapped);
      })
      .catch(err => {
        console.error("Error loading menu:", err);
        setMenuItems([]); // fallback to empty
      });
  }, []);

  // Prevent errors if menuItems is empty
  if (menuItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: "#fff" }}>No menu items yet.</h2>
      </div>
    );
  }

  const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
  const nextIndex = (currentIndex + 1) % menuItems.length;

  const handleNext = () => {
    setDirection("right");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % menuItems.length);
      setDirection("");
    }, 350);
  };

  const handlePrev = () => {
    setDirection("left");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      setDirection("");
    }, 350);
  };

  const handleOrder = () => {
    const item = menuItems[currentIndex];
    const cartItem = {
      title: item.name,
      price: item.price,
      banner: item.image,
      productId: item._id // This must be a valid ObjectId string!
    };
    addToCart(cartItem);
    if (typeof openCartSidebar === "function") {
      openCartSidebar();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="menu-carousel-container">
          <button className="nav-btn left" onClick={handlePrev} aria-label="Previous">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="carousel">
            {/* Previous (shadow) */}
            <div
              className={`menu-card shadow-card left-card ${direction === "left" ? "slide-in-right" : direction === "right" ? "slide-out-left" : ""}`}
            >
              <img
                src={menuItems[prevIndex].image}
                alt=""
                className="shadow-img"
                draggable="false"
              />
            </div>
            {/* Current (main) */}
            <div
              className={`menu-card main-card ${direction === "left" ? "slide-in-center-from-left" : direction === "right" ? "slide-in-center-from-right" : ""}`}
            >
              <div className="overlay" />
              <div className="menu-details">
                <img src={menuItems[currentIndex].image} alt={menuItems[currentIndex].name} className="menu-img" />
                <h1>{menuItems[currentIndex].name}</h1>
                <span className="menu-price">{menuItems[currentIndex].price}</span>
                <p className="menu-description">{menuItems[currentIndex].description}</p>
                <ul className="menu-tags">
                  {menuItems[currentIndex].tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Next (shadow) */}
            <div
              className={`menu-card shadow-card right-card ${direction === "right" ? "slide-in-left" : direction === "left" ? "slide-out-right" : ""}`}
            >
              <img
                src={menuItems[nextIndex].image}
                alt=""
                className="shadow-img"
                draggable="false"
              />
            </div>
            {/* Cart button always below main card */}
            <button className="order-btn fixed-cart-btn" onClick={handleOrder}>
              <svg className="cart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6h15l-1.5 9h-13z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="21" r="1" fill="currentColor"/>
                <circle cx="18" cy="21" r="1" fill="currentColor"/>
              </svg>
              Order
            </button>
          </div>
          <button className="nav-btn right" onClick={handleNext} aria-label="Next">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <footer className="login-footer">
        <div className="footer-content">
          <span role="img" aria-label="rice">🍚</span>
          <span style={{ margin: '0 8px', fontWeight: 500 }}>Sinaing Express</span>
          <span style={{ color: '#ffbd59', margin: '0 8px' }}>|</span>
          <span style={{ fontSize: '0.95rem' }}>Delivering warmth, one pot at a time.</span>
          <span style={{ float: 'right', fontSize: '0.9rem', color: '#ffddaa', marginLeft: 'auto' }}>
            &copy; {new Date().getFullYear()} Sinaing Express
          </span>
        </div>
      </footer>
    </div>
  );
};

export default MenuCarousel;