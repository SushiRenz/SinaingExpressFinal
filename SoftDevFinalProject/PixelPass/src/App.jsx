import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from './pages/dashboard';
import Game from './pages/game'; 
import About from './pages/about';
import Navbar from './pages/navbar';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Profile from './pages/profile'; // <-- Import Profile
import { CartProvider } from './pages/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Cart /> {/* Cart component will be available on all pages */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} /> {/* <-- Add this line */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;