import React, { useState } from 'react';
import CreateAuction from '../../components/CreateAuction/CreateAuction';

const CreateAuctionPage = ({ createAuction }) => {
    const [auctionCount, setAuctionCount] = useState(1);

    const handleAddAuction = () => {
        if (auctionCount < 4 ) {
            setAuctionCount(auctionCount + 1)
        }
        
    };

    return (
        <div>
            <h1>Criar Leilão</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
                {[...Array(auctionCount)].map((_, index) => (
                    <CreateAuction key={index} createAuction={createAuction} />
                ))}
            </div>
            <button onClick={handleAddAuction}>Adicionar multiplos leilões</button>
        </div>
    );
};

export default CreateAuctionPage;
