import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from './pages/dashboard';
import Rice from './pages/rice'; 
import Bigas from './pages/bigas';
import Navbar from './pages/navbar';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
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
          <Route path="/rice" element={<Rice />} />
          <Route path="/bigas" element={<Bigas />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;