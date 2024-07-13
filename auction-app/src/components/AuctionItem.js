import React, { useEffect, useState } from 'react';
import './AuctionItem.css';
import AuctionTimer from './AuctionTimer';
import axios from 'axios';

const AuctionItem = ({ item, placeBid, timeRemaining, deleteItem }) => {
    const [incrementAmount, setIncrementAmount] = useState(500);
    const [bidderName, setBidderName] = useState('');
    const [lastBidder, setLastBidder] = useState(item.winner);
    const [currentBid, setCurrentBid] = useState(item.startingBid);
    const [remainingTime, setRemainingTime] = useState(timeRemaining);

    // Atualiza o tempo restante sempre que mudar
    useEffect(() => {
        setRemainingTime(timeRemaining);
    }, [timeRemaining]);

    // Atualiza o vencedor e o lance inicial quando o item muda
    useEffect(() => {
        setLastBidder(item.winner);
        setCurrentBid(item.startingBid);
    }, [item]);

    // Atualiza o tempo corrente do leilão e o vencedor no servidor a cada segundo
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
                console.error('Erro ao atualizar o vencedor do leilão: ', error);
            }
        };

        const timer = setInterval(() => {
            if (remainingTime > 0) {
                setRemainingTime(prevTime => prevTime - 1);
            }
        }, 1000);

        // Executa as atualizações no servidor ao montar e desmontar o componente
        updateAuctionTimeCurrent();
        updateAuctionWinner();

        return () => clearInterval(timer);
    }, [remainingTime, item._id, lastBidder]);

    // Handler para mudança no valor do incremento
    const handleIncrementAmountChange = (event) => {
        setIncrementAmount(parseInt(event.target.value));
    };

    // Handler para dar um lance
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
        setCurrentBid(newBidAmount);

        try {
            await axios.put(`https://farm-simulator-auction-mod.vercel.app/api/updateauction/${item._id}`, { startingBid: newBidAmount, winner: bidderName });
        } catch (error) {
            console.error('Erro ao atualizar o valor do lance:', error);
        }

        // Atualiza o estado local e chama a função do pai para atualizar o leilão
        placeBid(item._id, newBidAmount, bidderName);
        setLastBidder(bidderName);
    };

    // Handler para mudança no nome do licitante
    const handleNameChange = (event) => {
        setBidderName(event.target.value);
    };

    // Handler para o fim do timer
    const handleTimerEnd = () => {
        if (remainingTime > 0) {
            setLastBidder(bidderName); 
        }
        setRemainingTime(0);
    };

    return (
        <div className="auction-item">
            <h2 className="auction-item-title">{item.name}</h2>
            <img src={item.imageUrl} alt={item.name} className="auction-item-image" />
            <p className="auction-item-description">{item.description}</p>
            <div className="auction-item-details">
                <div className="auction-item-bid">
                    <p className="auction-item-current-bid">Lance Atual: R${currentBid}</p>
                    <label htmlFor={`increment-amount-${item._id}`} className="auction-item-label">Novo Lance:</label>
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
                    <p>
                        <span className="info-label">Novo Valor do Lance:</span>
                        <span className='new-value'> R${currentBid + incrementAmount}</span>
                    </p>
                    <p>
                        <span className="info-label">Último Lance por:
                        </span><span className='last-onner'>  {lastBidder} </span>
                        <span className="info-label"> Valor:</span>
                        <span className="value-name"> R${currentBid} </span>
                    </p>
                    <p>
                        <span className="info-label">Proprietário:</span>
                        <span className="owner-name">{item.owner}</span>
                    </p>
                    <p>
                        <span className="info-label">Quem está Vencendo:</span>
                        <span className='where-winner'> {lastBidder} </span>
                    </p>
                    {remainingTime === 0 && (
                        <p>
                            <span className="info-label">Vencedor:</span>
                            <span className="winner-name">{lastBidder}</span>
                        </p>
                    )}
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
        </div>
    );
};

export default AuctionItem;
