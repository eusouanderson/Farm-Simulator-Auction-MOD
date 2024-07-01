import React from 'react';
import AuctionItem from './AuctionItem';

const AuctionList = ({ items, placeBid }) => {
    return (
        <div className="auction-list">
            {items.map(item => (
                <AuctionItem key={item.id} item={item} placeBid={placeBid} />
            ))}
        </div>
    );
};

export default AuctionList;
