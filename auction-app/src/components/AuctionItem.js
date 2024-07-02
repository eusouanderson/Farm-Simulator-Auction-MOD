import React, { useState, useEffect } from 'react';
import './AuctionItem.css';
import AuctionTimer from './AuctionTimer';

const AuctionItem = ({ item, placeBid, timeRemaining }) => {
    const [incrementAmount, setIncrementAmount] = useState(500);
    const [bidderName, setBidderName] = useState('');
    const [lastBidder, setLastBidder] = useState(item.lastBidder);
    const [currentBid, setCurrentBid] = useState(item.startingBid);
    const [winner, setWinner] = useState('');
    const [remainingTime, setRemainingTime] = useState(timeRemaining);

    useEffect(() => {
        setRemainingTime(timeRemaining);
    }, [timeRemaining]);

    useEffect(() => {
        const updateLocalStorage = () => {
            const auctionData = JSON.parse(localStorage.getItem('auctions')) || { auctions: [] };
            const updatedItems = auctionData.auctions.map(a => {
                if (a.id === item.id) {
                    return { ...a, lastBidder, bidCount: item.bidCount + 1, startingBid: currentBid, winner };
                }
                return a;
            });
            localStorage.setItem('auctions', JSON.stringify({ auctions: updatedItems }));
        };

        updateLocalStorage();
    }, [lastBidder, item.bidCount, item.id, currentBid, winner]);

    const handleIncrementAmountChange = (event) => {
        setIncrementAmount(parseInt(event.target.value));
    };

    const handlePlaceBid = () => {
        if (bidderName.trim() === '') {
            alert('Por favor, insira seu nome para dar um lance.');
            return;
        }

        if (remainingTime <= 0) {
            alert('O leilão já terminou. Não é possível dar mais lances.');
            return;
        }

        const newBidAmount = currentBid + incrementAmount;
        placeBid(item.id, newBidAmount, bidderName);
        setLastBidder(bidderName);
        setCurrentBid(newBidAmount);
    };

    const handleNameChange = (event) => {
        setBidderName(event.target.value);
    };

    const handleTimerEnd = () => {
        if (remainingTime > 0) {
            setWinner(lastBidder);
        }
        setRemainingTime(0); // Garante que o tempo restante seja zero ao finalizar
    };

    return (
        <div className="auction-item">
            <h2>{item.name}</h2>
            <img src={item.imageUrl} alt={item.name} className="auction-item-image" />
            <p className="auction-item-description">{item.description}</p>
            <div className="auction-item-details">
                <div className="auction-item-bid">
                    <p className="auction-item-current-bid">Lance Atual: R${currentBid}</p>
                    <label htmlFor={`increment-amount-${item.id}`}>Novo Lance:</label>
                    <select
                        id={`increment-amount-${item.id}`}
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
                    <p><span className="info-label">Último Lance por:</span> {lastBidder} <span className="info-label">Valor:</span> R${incrementAmount}</p>
                    <p><span className="info-label">Quantidade de Lances:</span> {item.bidCount}</p>
                    <p><span className="info-label">Proprietário:</span> <span className="owner-name">{item.owner}</span></p>
                    <p><span className="info-label">Vencedor:</span> {winner}</p>

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
