import React from 'react';
import AuctionList from '../components/AuctionList';
import './HomePage.css';

const HomePage = ({ items, placeBid }) => {
    return (
        <div className="container">
            <header className="header">
                <h1>Leilão Farm Simulator</h1>
            </header>
            <nav>
                <ul>
                    <li><a href="/contact">Contato</a></li>
                </ul>
            </nav>
            <main className="auction-list">
                <AuctionList items={items} placeBid={placeBid} />
            </main>
            <footer className="footer">
                <p>Conheça mais sobre o B.o.B no meu <a href="https://github.com/eusouanderson">GitHub</a>.</p>
                <p>&copy; 2024 Leilão Farm Simulator. Todos os direitos reservados </p>
            </footer>
        </div>
    );
};

export default HomePage;
