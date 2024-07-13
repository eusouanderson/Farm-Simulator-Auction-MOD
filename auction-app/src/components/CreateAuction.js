import React from 'react';
import './CreateAuction.css';
import AuctionTimer from './AuctionTimer';
import { insertIntoAuctions } from './sendData';
import Resizer from 'react-image-file-resizer';
import Modal from 'react-modal';

let auctionsData = { auctions: [] };
if (localStorage.getItem('auctions')) {
    auctionsData = JSON.parse(localStorage.getItem('auctions'));
} else {
    localStorage.setItem('auctions', JSON.stringify(auctionsData));
}


Modal.setAppElement('#root');

const CreateAuction = () => {
    const [ownerName, setOwnerName] = React.useState('');
    const [itemName, setItemName] = React.useState('');
    const [startingBid, setStartingBid] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [time, setTime] = React.useState('');
    const [auctionTime, setAuctionTime] = React.useState(null);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const timeInSeconds = time * 60;

        const newAuction = {
            owner: ownerName,
            name: itemName,
            startingBid: parseFloat(startingBid),
            imageUrl,
            timeRemaining: timeInSeconds,
            timeCurrent: 0,
            winner: '',
            lastSpear: '',
            description: ''
        };

        await insertIntoAuctions(newAuction);

        auctionsData.auctions.push(newAuction);
        const jsonString = JSON.stringify(auctionsData);
        localStorage.setItem('auctions', jsonString);

        setAuctionTime(timeInSeconds);
        setModalIsOpen(true);

        setOwnerName('');
        setItemName('');
        setStartingBid('');
        setImageUrl('');
        setTime('');
        
        setTimeout(() => {
            closeModal();
        }, 4000);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            
            Resizer.imageFileResizer(
                file,
                500,
                500,
                'WEBP',
                100,
                0,
                (uri) => {
                    setImageUrl(uri);
                },
                'base64'
            );
        }
    };

    const convertMinutesToHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours} hora(s) e ${minutes} minuto(s)`;
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setAuctionTime(null);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Inserir dados do Item</h2>
                <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Nome do Leiloeiro"
                    required
                />
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Nome do Item"
                    required
                />
                <input
                    type="number"
                    value={startingBid}
                    onChange={(e) => setStartingBid(e.target.value)}
                    placeholder="Preço Inicial"
                    required
                />
                <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    required
                />
                <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Tempo Para Finalizar o Leilão (minutos)"
                    required
                />
                {time && (
                    <p>
                        Tempo inserido: {time} minuto(s) - Equivalente a{' '}
                        {convertMinutesToHoursAndMinutes(time)}.
                    </p>
                )}

                {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />}

                <button type="submit">Criar</button>
            </form>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Leilão Criado"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Leilão Criado !!</h2>
                {auctionTime !== null && <AuctionTimer time={auctionTime} />}
            </Modal>
            <p> Até o momento só está funcionando com imagens no formato PNG e WEBP </p>
        </div>
    );
};

export default CreateAuction;
