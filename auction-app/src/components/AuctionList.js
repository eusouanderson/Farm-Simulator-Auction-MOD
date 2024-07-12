import React, { useEffect, useState } from 'react';
import AuctionItem from './AuctionItem';
import axios from 'axios';

const AuctionList = ({ placeBid }) => {
    const [auctionItems, setAuctionItems] = useState([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('https://farm-simulator-auction-mod.vercel.app/api/getauctions'); // Endpoint do seu back-end
                setAuctionItems(response.data); // Atualiza o estado com os leilões recebidos do servidor
            } catch (error) {
                console.error('Erro ao buscar leilões:', error);
            }
        };

        fetchAuctions();
    }, []);

    const deleteItem = async (id) => {
        try {
            await axios.delete(`https://farm-simulator-auction-mod.vercel.app/api/deleteauctions/${id}`);
            const updatedItems = auctionItems.filter(item => item._id !== id);
            setAuctionItems(updatedItems);
        } catch (error) {
            console.error('Erro ao deletar leilão:', error);
        }
    };

    return (
        <div>
            {auctionItems && auctionItems.length > 0 ? (
                auctionItems.map(item => (
                    <AuctionItem
                        key={item._id} 
                        item={item}
                        placeBid={placeBid}
                        timeRemaining={item.timeRemaining}
                        deleteItem={() => deleteItem(item._id.toString())}
                    />
                ))
            ) : (
                <p>Nenhum leilão ativo.</p>
            )}
        </div>
    );
};

export default AuctionList;
