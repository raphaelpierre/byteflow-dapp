import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Staking from './pages/Staking';
import Swap from './pages/Swap';
import Wallet from './pages/Wallet';
import Pool from './pages/Pool';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/pool" element={<Pool />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;