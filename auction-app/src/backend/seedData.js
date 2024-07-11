const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://eusouanderson:67983527@cluster0.fuidnmk.mongodb.net/farmSimulator?retryWrites=true&w=majority';

// Defina o esquema para os leilões
const auctionSchema = new mongoose.Schema({
    owner: String,
    name: String,
    startingBid: Number,
    imageUrl: String,
    timeRemaining: Number,
    timeCurrent: Number,
    description: String
});

// Modelo para a coleção de leilões
const Auction = mongoose.model('Auction', auctionSchema);

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conexão ao MongoDB Atlas bem sucedida');

        // Verifica se a coleção "auctions" existe
        const collectionExists = await mongoose.connection.db.listCollections().toArray();
        if (!collectionExists.some(collection => collection.name === 'auctions')) {
            // Se a coleção não existir, cria e insere os dados
            console.log('Coleção "auctions" não encontrada. Criando...');

            await Auction.create({
                owner: 'Anderson',
                name: 'Item A',
                startingBid: 100,
                imageUrl: 'https://example.com/item-a.jpg',
                timeRemaining: 3600,
                timeCurrent: 0,
                description: 'Descrição do Item A'
            });

            console.log('Dados inseridos com sucesso na coleção "auctions".');
        } else {
            console.log('Coleção "auctions" já existe, não foi necessário criar.');
        }
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB Atlas:', error.message);
        process.exit(1);
    } finally {
        mongoose.disconnect(); // Fecha a conexão ao final da execução
    }
};

connectDB(); // Chama a função para conectar ao MongoDB

module.exports = connectDB;
