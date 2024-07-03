import React, { useEffect, useState } from 'react';
import AuctionItem from './AuctionItem';

const AuctionList = ({ placeBid }) => {
    const [auctionItems, setAuctionItems] = useState([]);

    useEffect(() => {
        const loadItemsFromLocalStorage = () => {
            const auctionData = JSON.parse(localStorage.getItem('auctions')) || { auctions: [] };
            setAuctionItems(auctionData.auctions);
        };

        loadItemsFromLocalStorage();
    }, []);

    const deleteItem = (id) => {
        const updatedItems = auctionItems.filter(item => item.id !== id);
        setAuctionItems(updatedItems);
        localStorage.setItem('auctions', JSON.stringify({ auctions: updatedItems }));
    };

    return (
        <div>
            {auctionItems && auctionItems.length > 0 ? (
                auctionItems.map(item => (
                    <AuctionItem
                        key={item.id}
                        item={item}
                        placeBid={placeBid}
                        timeRemaining={item.timeRemaining}
                        deleteItem={deleteItem}
                    />
                ))
            ) : (
                <p>Nenhum leilão Ativo.</p>
            )}
        </div>
    );
};

export default AuctionList;
