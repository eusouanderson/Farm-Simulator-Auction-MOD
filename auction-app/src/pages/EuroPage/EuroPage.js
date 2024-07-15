import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './EuroPage.css';

const EuroPage = ({ items, placeBid }) => {
    return (
        <div className="container">
            <Header />
            <main className="auction-list">
                <p>Ets</p>
            </main>
            <Footer />
        </div>
    );
};

export default EuroPage;
