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

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className="auction-timer">
            <p>Tempo restante para o leilão: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
        </div>
    );
};

export default AuctionTimer;
