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
          <li><Link to="/rice">Menu</Link></li>
          <li>
            <button
              onClick={handleLogout}
              className="logout-link"
              aria-label="Logout"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginLeft: "10px" }}
            >
              <svg className="logout-icon" width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M16 17l5-5m0 0l-5-5m5 5H9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </li>
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;