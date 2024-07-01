// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateAuctionPage from './pages/CreateAuctionPage';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);

  const createAuction = (item) => {
    setItems([...items, { ...item, id: items.length + 1, currentBid: item.startingBid }]);
  };

  const placeBid = (id, bidAmount) => {
    setItems(items.map(item =>
      item.id === id && bidAmount > item.currentBid
        ? { ...item, currentBid: bidAmount }
        : item
    ));
  };

  return (
    <Router>
      <nav>
        <Link to="/">Leilões</Link>
        <Link to="/create-auction">Criar Leilão</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage items={items} placeBid={placeBid} />} />
        <Route path="/create-auction" element={<CreateAuctionPage createAuction={createAuction} />} />
      </Routes>
    </Router>
  );
};

export default App;
