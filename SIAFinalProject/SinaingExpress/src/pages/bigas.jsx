import React from 'react';
import Navbar from "./navbar";
import './bigas.css';

const riceProducts = [
  {
    name: "Premium Jasmine Rice",
    description: "Soft, fragrant, and perfect for everyday meals.",
    price: "₱60 / kg",
    image: "/assets/jasmine.jpg"
  },
  {
    name: "Dinorado Rice",
    description: "Locally loved for its aroma and slightly sticky texture.",
    price: "₱55 / kg",
    image: "/assets/dinorado.jpg"
  },
  {
    name: "Sinandomeng Rice",
    description: "Classic Filipino rice, fluffy and versatile.",
    price: "₱50 / kg",
    image: "/assets/sinandomeng.jpg"
  },
  {
    name: "Brown Rice",
    description: "Healthy, whole grain rice with a nutty flavor.",
    price: "₱70 / kg",
    image: "/assets/brownrice.jpg"
  },
  {
    name: "Red Rice",
    description: "Rich in fiber and nutrients, with a unique taste.",
    price: "₱75 / kg",
    image: "/assets/redrice.jpg"
  },
  {
    name: "Black Rice",
    description: "High in antioxidants, with a deep, earthy flavor.",
    price: "₱80 / kg",
    image: "/assets/blackrice.jpg"
  },
  {
    name: "Sticky Rice",
    description: "Perfect for kakanin and desserts, glutinous and soft.",
    price: "₱65 / kg",
    image: "/assets/stickyrice.jpg"
  },
  {
    name: "Organic Brown Rice",
    description: "Grown without chemicals, healthy and flavorful.",
    price: "₱85 / kg",
    image: "/assets/organicbrown.jpg"
  },
  {
    name: "Well-Milled Rice",
    description: "Affordable and ideal for everyday meals.",
    price: "₱45 / kg",
    image: "/assets/wellmilled.jpg"
  },
  {
    name: "Long Grain Rice",
    description: "Fluffy and non-sticky, great for fried rice.",
    price: "₱58 / kg",
    image: "/assets/longgrain.jpg"
  },
  {
    name: "Short Grain Rice",
    description: "Sticky and plump, perfect for sushi and paella.",
    price: "₱62 / kg",
    image: "/assets/shortgrain.jpg"
  },
  {
    name: "Parboiled Rice",
    description: "Nutritious and less sticky, holds shape after cooking.",
    price: "₱68 / kg",
    image: "/assets/parboiled.jpg"
  }
];

const Bigas = () => {
  return (
    <div>
      <Navbar />
      <div className="bigas-list-section">
        <h2 className="bigas-list-title">Available Rice Varieties</h2>
        <div className="bigas-grid">
          {riceProducts.map((rice, idx) => (
            <div className="bigas-card" key={idx}>
              <img src={rice.image} alt={rice.name} className="bigas-img" />
              <div className="bigas-info">
                <h3>{rice.name}</h3>
                <p>{rice.description}</p>
                <div className="bigas-price">{rice.price}</div>
                <button className="bigas-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bigas;