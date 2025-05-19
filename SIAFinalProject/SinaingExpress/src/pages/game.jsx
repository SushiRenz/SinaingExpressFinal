import React, { useState } from "react";
import "./game.css";
import { useCart } from "./CartContext";

const games = [
  {
    title: "Clair Obscur: Expedition 33",
    price: "$30.00",
    banner: "/assets/clairBG-banner.jpeg",
    screenshots: [
      "/assets/screenshot1.jpg",
      "/assets/screenshot2.jpg",
      "/assets/screenshot3.jpg",
    ],
    description:
      "Clair Obscur: Expedition 33 is a turn-based role-playing game with real-time elements. The player controls a party of Expeditioners exploring a fantasy world.",
    tags: ["Turn-Based", "Story Rich", "Fantasy", "RPG"],
    publisherIcon: "/assets/kepler-icon.jpg",
    developerIcon: "/assets/sandfall-icon.jpeg",
  },
  {
    title: "Final Fantasy VII Remake",
    price: "$59.99",
    banner: "/assets/ff7BG-banner.jpg",
    screenshots: [
      "/assets/screenshot4.jpg",
      "/assets/screenshot5.jpg",
      "/assets/screenshot6.png",
    ],
    description:
      "Final Fantasy VII Remake is a 2020 action role-playing game developed and published by Square Enix for the PlayStation 4.",
    tags: ["RPG", "Action RPG", "JRPG", "Single Player"],
    publisherIcon: "/assets/squareenix-icon.png",
    developerIcon: "/assets/squareenixdev-icon.png",
  },
  {
    title: "Elden Ring",
    price: "$45.99",
    banner: "/assets/eldenringBG-banner.jpg",
    screenshots: [
      "/assets/screenshot7.jpg",
      "/assets/screenshot8.jpg",
      "/assets/screenshot9.jpg",
    ],
    description:
      "Elden Ring is a 2022 action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment.",
    tags: ["Souls-like", "Open World", "Dark Fantasy", "RPG"],
    publisherIcon: "/assets/bandai-icon.png",
    developerIcon: "/assets/fromsoftware-icon.jpg",
  },
];

const Game = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(""); // "left" or "right" for animation
  const { addToCart } = useCart();

  const prevIndex = (currentIndex - 1 + games.length) % games.length;
  const nextIndex = (currentIndex + 1) % games.length;

  const handleNext = () => {
    setDirection("right");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length);
      setDirection("");
    }, 350);
  };

  const handlePrev = () => {
    setDirection("left");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
      setDirection("");
    }, 350);
  };

  const handleAddToCart = () => {
    const success = addToCart(games[currentIndex]);
    if (!success) {
      alert("This item is already in your cart!");
    }
  };

  return (
    <div className="game-container">
      <button className="nav-btn left" onClick={handlePrev} aria-label="Previous">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="carousel">
        {/* Previous (shadow) */}
        <div
          className={`game-card shadow-card left-card ${direction === "left" ? "slide-in-right" : direction === "right" ? "slide-out-left" : ""}`}
          style={{ backgroundImage: `url(${games[prevIndex].banner})` }}
        >
          <div className="overlay" />
        </div>
        {/* Current (main) */}
        <div
          className={`game-card main-card ${direction === "left" ? "slide-in-center-from-left" : direction === "right" ? "slide-in-center-from-right" : ""}`}
          style={{ backgroundImage: `url(${games[currentIndex].banner})` }}
        >
          <div className="overlay" />
          <div className="game-details">
            <h1>{games[currentIndex].title}</h1>
            <div className="price-cart-row">
              <span className="price">{games[currentIndex].price}</span>
              <button 
                className="add-to-cart small" 
                title="Add to Cart"
                onClick={handleAddToCart}
              >
                <svg className="cart-icon small" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="21" r="1.5" fill="currentColor"/>
                  <circle cx="18" cy="21" r="1.5" fill="currentColor"/>
                  <path d="M5 6h2l1 9h10l1-7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="gallery">
              {games[currentIndex].screenshots.map((src, i) => (
                <img
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  key={i}
                  onClick={() => window.open(src, "_blank")}
                />
              ))}
            </div>
            <p className="description">{games[currentIndex].description}</p>
            <ul className="tags">
              {games[currentIndex].tags.map((tag, i) => (
                <li key={i}>{tag}</li>
              ))}
            </ul>
            <div className="game-icons">
              <img src={games[currentIndex].publisherIcon} alt="Publisher" className="icon-img" />
              <img src={games[currentIndex].developerIcon} alt="Developer" className="icon-img" />
            </div>
          </div>
        </div>
        {/* Next (shadow) */}
        <div
          className={`game-card shadow-card right-card ${direction === "right" ? "slide-in-left" : direction === "left" ? "slide-out-right" : ""}`}
          style={{ backgroundImage: `url(${games[nextIndex].banner})` }}
        >
          <div className="overlay" />
        </div>
      </div>
      <button className="nav-btn right" onClick={handleNext} aria-label="Next">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Game;