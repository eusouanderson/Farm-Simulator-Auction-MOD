import React from 'react';
import AuctionList from '../components/AuctionList';
import logo from '../image/logo.png';
import './HomePage.css';


const HomePage = ({ items, placeBid }) => {
    return (
        <div className="container">
            <header className="header">
                <h1>
                    <img src={logo} alt="Logo" className="header-logo" />
                    Leilão Farm Simulator 
                </h1>
            </header>
            <nav>
                <ul>
                    <li><a href="https://github.com/eusouanderson" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                </ul>
            </nav>
            <main className="auction-list">
                <AuctionList items={items} placeBid={placeBid} />
            </main>
            <footer className="footer">
                <p>B.o.B <a href="https://github.com/eusouanderson">GitHub</a>.</p>
                <p>&copy; 2024 Leilão Farm Simulator v0.1.0. Todos os direitos reservados </p>
            </footer>
        </div>
    );
};

export default HomePage;
