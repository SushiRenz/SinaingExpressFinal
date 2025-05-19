import React from 'react';
import Navbar from "./navbar";
import './dashboard.css';
import { useCart } from './CartContext';


const featuredMeals = [
  {
    name: "Sinangag",
    desc: "Classic rice dish that elevates human comprehension.",
    img: "https://www.maggi.ph/sites/default/files/styles/home_stage_1500_700/public/srh_recipes/bfdc4aabaa491807618e7303c20723c6.jpg?h=476030cb&itok=32TzQ7Pc"
  },
  {
    name: "Chicken Inasal Bowl",
    desc: "Grilled chicken inasal with java rice and atchara.",
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Pork Sisig Rice",
    desc: "Sizzling pork sisig on a bed of steamed rice.",
    img: "https://images.unsplash.com/photo-1523987355523-c7b5b0723cdd?auto=format&fit=crop&w=400&q=80"
  }
];

const Dashboard = () => {
  const { currentUser } = useCart();

  return (
    <div>
      <Navbar />
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1>
            Welcome to <span className="sinaing-logo">Sinaing Express</span>
            {currentUser && currentUser.username ? `, ${currentUser.username}` : ""}
          </h1>
          <p className="hero-tagline">
            Your online takeout for all things rice! Enjoy Filipino favorites and rice bowls, hot and fresh, delivered to your door.
          </p>
          <a href="/game" className="btn hero-btn">Browse Rice Meals</a>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80" alt="Rice Bowl" />
        </div>
      </div>

      <div className="featured-section">
        <h2 className="featured-title">Best Sellers</h2>
        <div className="meals-grid">
          {featuredMeals.map((meal, idx) => (
            <div className="meal-card" key={idx}>
              <img src={meal.img} alt={meal.name} className="meal-img" />
              <div className="meal-info">
                <h3>{meal.name}</h3>
                <p>{meal.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;