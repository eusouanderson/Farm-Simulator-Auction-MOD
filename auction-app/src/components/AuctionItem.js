import React, { useState, useEffect } from 'react';
import './AuctionItem.css';

const AuctionItem = ({ item, placeBid }) => {
    const [incrementAmount, setIncrementAmount] = useState(500);
    const [bidderName, setBidderName] = useState('');
    const [lastBidder, setLastBidder] = useState(item.lastBidder);
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(item.time)); 
    console.log(item.time)

    
    function calculateTimeRemaining(timeString) {
        if (!timeString) return 0;
        
        if (timeString.includes(':')) {
            const [minutes, seconds] = timeString.split(':');
            return parseInt(minutes) * 60 + parseInt(seconds);
        } else {
            return parseInt(timeString); 
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                }
                return prevTime; 
            });
        }, 1000);

        return () => clearInterval(timer); 
    }, []); 

    const handleIncrementAmountChange = (event) => {
        setIncrementAmount(parseInt(event.target.value));
    };

    const handlePlaceBid = () => {
        if (bidderName.trim() === '') {
            alert('Por favor, insira seu nome para dar um lance.');
            return;
        }

        const newBidAmount = item.currentBid + incrementAmount;
        placeBid(item.id, newBidAmount, bidderName);
        setLastBidder(bidderName); 
    };

    const handleNameChange = (event) => {
        setBidderName(event.target.value);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="auction-item">
            <h2>{item.name}</h2>
            <img src={item.imageUrl} alt={item.name} className="auction-item-image" />
            <p className="auction-item-description">{item.description}</p>
            <div className="auction-item-details">
                <div className="auction-item-bid">
                    <p className="auction-item-current-bid">Lance Atual: R${item.currentBid}</p>
                    <label htmlFor={`increment-amount-${item.id}`}>Novo Lance:</label>
                    <select
                        id={`increment-amount-${item.id}`}
                        value={incrementAmount}
                        onChange={handleIncrementAmountChange}
                        className="auction-item-select"
                    >
                        {[...Array(21).keys()].map(i => (
                            <option key={i} value={500 * (i + 1)}>{500 * (i + 1)}</option>
                        ))}
                    </select>
                </div>
                <div className="auction-item-info">
                    <p><span className="info-label">Novo Valor do Lance:</span> R${item.currentBid + incrementAmount}</p>
                    <p><span className="info-label">Tempo Restante:</span> {formatTime(timeRemaining)}</p>
                    <p><span className="info-label">Último Lance por:</span> {lastBidder} <span className="info-label">Valor:</span> R${incrementAmount}</p>
                    <p><span className="info-label">Quantidade de Lances:</span> {item.bidCount}</p>
                    <p><span className="info-label">Proprietário:</span> <span className="owner-name">{item.owner}</span></p>
                    <p><span className="info-label">Vencedor:</span> {item.winner}</p>
                </div>
            </div>
            <input
                type="text"
                value={bidderName}
                onChange={handleNameChange}
                placeholder="Insira seu nome"
                className="auction-item-input"
            />
            <button onClick={handlePlaceBid} className="auction-item-button">Dar Lance</button>
        </div>
    );
};

export default AuctionItem;
