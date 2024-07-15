import React from 'react';
import AuctionList from '../../components/ActionList/AuctionList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './FarmPage.css';

const FarmPage = ({ items, placeBid }) => {
    return (
        <div className="container">
            <Header />
            <main className="auction-list">
                <AuctionList items={items} placeBid={placeBid} />
            </main>
            <Footer />
        </div>
    );
};

export default FarmPage;
