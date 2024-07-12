import React, { useEffect, useState } from 'react';
import AuctionItem from './AuctionItem';
import axios from 'axios';

const AuctionList = ({ placeBid }) => {
    const [auctionItems, setAuctionItems] = useState([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getauctions'); // Endpoint do seu back-end
                setAuctionItems(response.data); // Atualiza o estado com os leilões recebidos do servidor
            } catch (error) {
                console.error('Erro ao buscar leilões:', error);
            }
        };

        fetchAuctions();
    }, []);

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/getauctions/${id}`); // Endpoint para deletar leilão
            const updatedItems = auctionItems.filter(item => item._id !== id); // Filtra o item excluído
            setAuctionItems(updatedItems); // Atualiza o estado local
        } catch (error) {
            console.error('Erro ao deletar leilão:', error);
        }
    };

    return (
        <div>
            {auctionItems && auctionItems.length > 0 ? (
                auctionItems.map(item => (
                    <AuctionItem
                        key={item._id} // Use _id como chave única do MongoDB
                        item={item}
                        placeBid={placeBid}
                        timeRemaining={item.timeRemaining}
                        deleteItem={deleteItem}
                    />
                ))
            ) : (
                <p>Nenhum leilão ativo.</p>
            )}
        </div>
    );
};

export default AuctionList;
