import React from 'react';
import './navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // lowercase as requested

function Navbar() {
  const location = useLocation();
  const { toggleCart } = useCart(); // Get toggleCart from context
  const navigate = useNavigate();

  // Hide navbar on login and signup pages
  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup"
  ) return null;

  // Logout handler with confirmation
  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      // Optionally clear user session here
      navigate("/"); // Redirect to home/login
    }
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/game">Games</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* 🛒 Clicking this toggles the cart */}
          <button 
            onClick={toggleCart}
            className="cart-link" 
            aria-label="Cart"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <svg className="cart-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="21" r="1.5" fill="currentColor"/>
              <circle cx="18" cy="21" r="1.5" fill="currentColor"/>
              <path d="M5 6h2l1 9h10l1-7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <Link to="/profile" className="user-link" aria-label="User Profile" style={{ marginLeft: "16px" }}>
            <svg className="user-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </Link>

          <li>
            <a href="/" onClick={handleLogout}>Logout</a>
          </li>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;