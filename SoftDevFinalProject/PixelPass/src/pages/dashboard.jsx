import React from 'react';
import Navbar from "./navbar";
import './dashboard.css';
import { useCart } from './CartContext'; // Add this import

const Dashboard = () => {
  const { currentUser } = useCart(); // Get current user from context

  return (
    <div>
      <Navbar />
      <div className="welcome-container">
        <div className="dashboard-flex">
          <div className="dashboard-text">
            <h1>
              Welcome to PixelPass
              {currentUser && currentUser.username ? `, ${currentUser.username}` : ""}
            </h1>
            <p>
             PixelPass is your ultimate destination for digital game shopping.
Browse a wide selection of titles across all genres and platforms. From the latest releases to timeless classics, PixelPass makes it easy to discover, buy, and download your next favorite game. Fast, secure, and made for gamers like you.
            </p>
            <a href="/game" className="btn">Explore Games</a>
          </div>
          <div className="dashboard-image-container">
            <img
              src="/assets/marioDashboard.png"
              alt="Gaming"
              className="dashboard-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;