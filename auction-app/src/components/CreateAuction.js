import React from 'react';
import './CreateAuction.css';

const CreateAuction = ({ createAuction }) => {
    const [ownerName, setOwnerName] = React.useState('');
    const [itemName, setItemName] = React.useState('');
    const [startingBid, setStartingBid] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [time, setTime] = React.useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();

        
        const [minutes, seconds] = time.split(':').map(parseFloat);
        const timeInSeconds = minutes * 60 + seconds;

        createAuction({
            owner: ownerName,
            name: itemName,
            startingBid: parseFloat(startingBid),
            imageUrl,
            timeRemaining: timeInSeconds 
        });

        
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
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Tempo Para Finalizar o Leilão (minutos:segundos)"
                required
            />

            {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />}

            <button type="submit">Criar</button>
        </form>
    );
};

export default CreateAuction;
