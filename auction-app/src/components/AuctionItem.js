import React, { useEffect, useState } from 'react';
import './AuctionItem.css';
import AuctionTimer from './AuctionTimer';
import axios from 'axios';

const AuctionItem = ({ item, placeBid, timeRemaining, deleteItem }) => {
    const [incrementAmount, setIncrementAmount] = useState(500);
    const [bidderName, setBidderName] = useState('');
    const [lastBidder, setLastBidder] = useState(item.lastBidder);
    const [currentBid, setCurrentBid] = useState(item.startingBid);
    const [remainingTime, setRemainingTime] = useState(timeRemaining);

    useEffect(() => {
        setRemainingTime(timeRemaining);
    }, [timeRemaining]);

    useEffect(() => {
        const updateAuctionTimeCurrent = async () => {
            try {
                await axios.put(`https://farm-simulator-auction-mod.vercel.app/api/updateauction/${item._id}`, { timeCurrent: remainingTime, timeRemaining: remainingTime });
            } catch (error) {
                console.error('Erro ao atualizar tempo corrente do leilão:', error);
            }
        };

        const updateAuctionWinner = async () => {
            try {
                await axios.put(`https://farm-simulator-auction-mod.vercel.app/api/updateauction/${item._id}`, { winner: lastBidder });
            } catch (error) {
                console.error('Erro ao atualizar o vencedor do leilão: ', error)
            }
        };

        const timer = setInterval(() => {
            if (remainingTime > 0) {
                setRemainingTime(prevTime => prevTime - 1);
            }
        }, 1000);

        // Atualiza o tempo corrente e o vencedor quando o tempo restante muda
        updateAuctionTimeCurrent();
        updateAuctionWinner();

        // Limpa o temporizador quando o componente é desmontado ou o leilão termina
        return () => clearInterval(timer);
    }, [remainingTime, item._id, lastBidder]);

    const handleIncrementAmountChange = (event) => {
        setIncrementAmount(parseInt(event.target.value));
    };

    const handlePlaceBid = async () => {
        if (bidderName.trim() === '') {
            alert('Por favor, insira seu nome para dar um lance.');
            return;
        }

        if (remainingTime <= 0) {
            alert('O leilão já terminou. Não é possível dar mais lances.');
            return;
        }

        const newBidAmount = currentBid + incrementAmount;
        // Atualiza o lance atual no estado local
        setCurrentBid(newBidAmount);

        // Envia o novo lance para o backend
        try {
            await axios.put(`https://farm-simulator-auction-mod.vercel.app/api/updateauction/${item._id}`, { startingBid: newBidAmount });
        } catch (error) {
            console.error('Erro ao atualizar o valor do lance:', error);
        }

        // Atualiza o último licitante e o lance atual no estado local
        placeBid(item._id, newBidAmount, bidderName);
        setLastBidder(bidderName);
    };

    const handleNameChange = (event) => {
        setBidderName(event.target.value);
    };

    const handleTimerEnd = () => {
        if (remainingTime > 0) {
            setLastBidder(bidderName); 
        }
        setRemainingTime(0);
    };

    return (
        <div className="auction-item">
            <h2>{item.name}</h2>
            <img src={item.imageUrl} alt={item.name} className="auction-item-image" />
            <p className="auction-item-description">{item.description}</p>
            <div className="auction-item-details">
                <div className="auction-item-bid">
                    <p className="auction-item-current-bid">Lance Atual: R${currentBid}</p>
                    <label htmlFor={`increment-amount-${item._id}`}>Novo Lance:</label>
                    <select
                        id={`increment-amount-${item._id}`}
                        value={incrementAmount}
                        onChange={handleIncrementAmountChange}
                        className="auction-item-select"
                        disabled={remainingTime <= 0}
                    >
                        {[...Array(21).keys()].map(i => (
                            <option key={i} value={500 * (i + 1)}>{500 * (i + 1)}</option>
                        ))}
                    </select>
                </div>
                <div className="auction-item-info">
                    <p><span className="info-label">Novo Valor do Lance:</span> R${currentBid + incrementAmount}</p>
                    <p><span className="info-label">Último Lance por:</span> {item.winner} <span className="info-label">Valor:</span> R${incrementAmount}</p>
                    <p><span className="info-label">Proprietário:</span> <span className="owner-name">{item.owner}</span></p>
                    <p><span className="info-label">Quem esta Vencendo:</span> {item.winner}</p>

                    <p><AuctionTimer time={remainingTime} onTimerEnd={handleTimerEnd} /></p>
                </div>
            </div>
            <input
                type="text"
                value={bidderName}
                onChange={handleNameChange}
                placeholder="Insira seu nome"
                className="auction-item-input"
                disabled={remainingTime <= 0}
            />
            <button onClick={handlePlaceBid} className="auction-item-button" disabled={remainingTime <= 0}>
                Dar Lance
            </button>


             {/* <button onClick={() => deleteItem(item._id.toString())} className="auction-item-button" disabled={remainingTime <= 0}>
                Deletar Leilão
            </button> */}
        </div>
    );
};

export default AuctionItem;
