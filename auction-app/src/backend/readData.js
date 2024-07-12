const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://eusouanderson:67983527@cluster0.fuidnmk.mongodb.net/';

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

        // Função para ler todos os leilões
        const readAuctions = async () => {
            try {
                // Consulta todos os documentos na coleção "auctions"
                const auctions = await Auction.find();
                console.log('Leitura bem sucedida da coleção "auctions":', auctions);
                return auctions;
            } catch (error) {
                console.error('Erro ao ler dados da coleção "auctions":', error.message);
                return [];
            }
        };

        // Exemplo de uso da função para ler todos os leilões
        await readAuctions();

    } catch (error) {
        console.error('Erro ao conectar ao MongoDB Atlas:', error.message);
        process.exit(1);
    } finally {
        mongoose.disconnect(); // Fecha a conexão ao final da execução
    }
};

connectDB();

module.exports = connectDB;
