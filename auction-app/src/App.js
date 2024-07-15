import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FarmPage from './pages/FarmPage/FarmPage';
import EuroPage from './pages/EuroPage/EuroPage';
import CreateAuctionPage from './pages/FarmPage/CreateAuctionPage';
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
        <Route path="/" element={<FarmPage items={items} placeBid={placeBid} />} />
        <Route path="/create-auction" element={<CreateAuctionPage createAuction={createAuction} />} />
        <Route path="/euro-page" element={<EuroPage />} />
      </Routes>
    </Router>
  );
};

export default App;
