import React from 'react';
import './CreateAuction.css';
import AuctionTimer from './AuctionTimer';


let auctionsData = { auctions: [] };
if (localStorage.getItem('auctions')) {
    auctionsData = JSON.parse(localStorage.getItem('auctions'));
} else {
    localStorage.setItem('auctions', JSON.stringify(auctionsData));
}

const CreateAuction = () => {
    const [ownerName, setOwnerName] = React.useState('');
    const [itemName, setItemName] = React.useState('');
    const [startingBid, setStartingBid] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [time, setTime] = React.useState('');
    const [auctionTime, setAuctionTime] = React.useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const timeInSeconds = time * 60;

        const newAuction = {
            owner: ownerName,
            name: itemName,
            startingBid: parseFloat(startingBid),
            imageUrl,
            timeRemaining: timeInSeconds,
            description: '' // Adicione uma descrição se necessário
        };

        // Adicione o novo leilão aos dados existentes
        auctionsData.auctions.push(newAuction);

        // Atualize o arquivo JSON com os novos dados
        const jsonString = JSON.stringify(auctionsData);
        localStorage.setItem('auctions', jsonString);

        setAuctionTime(timeInSeconds);

        setOwnerName('');
        setItemName('');
        setStartingBid('');
        setImageUrl('');
        setTime('');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Inserir Novo Item</h2>
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

                {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />}

                <button type="submit">Criar</button>
            </form>

            {auctionTime !== null && <AuctionTimer time={auctionTime} />}
        </div>
    );
};

export default CreateAuction;
