import React, { useEffect, useState } from 'react';
import './AuctionTimer.css';

const AuctionTimer = ({ time, onTimerEnd }) => {
    const [timeRemaining, setTimeRemaining] = useState(time);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    if (onTimerEnd) {
                        onTimerEnd();
                    }
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimerEnd]);

    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    let displayTime = '';

    if (hours > 0) {
        displayTime = `${hours} hora${hours !== 1 ? 's' : ''} ${minutes < 10 ? `0${minutes}` : minutes} minuto${minutes !== 1 ? 's' : ''} ${seconds < 10 ? `0${seconds}` : seconds} segundo${seconds !== 1 ? 's' : ''}`;
    } else {
        displayTime = `${minutes} minuto${minutes !== 1 ? 's' : ''} ${seconds < 10 ? `0${seconds}` : seconds} segundo${seconds !== 1 ? 's' : ''}`;
    }

    return (
        <div className="auction-timer">
            <p>Tempo restante para o leilão: {displayTime}</p>
        </div>
    );
};


export default AuctionTimer;
