import React from 'react';
import CreateAuction from '../components/CreateAuction';

const CreateAuctionPage = ({ createAuction }) => {
    return (
        <div>
            <h1>Criar Leilão</h1>
            <CreateAuction createAuction={createAuction} />
        </div>
    );
};

export default CreateAuctionPage;
