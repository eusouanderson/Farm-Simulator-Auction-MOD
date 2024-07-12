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


const Auction = mongoose.model('Auction', auctionSchema);

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexão ao MongoDB Atlas bem sucedida');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB Atlas:', error.message);
        throw error; 
    }
};

const insertIntoAuctions = async (auctionData) => {
    try {
        await connectDB(); 
        
        const result = await Auction.create(auctionData);
        console.log('Dados inseridos com sucesso na coleção "auctions":', result);
    } catch (error) {
        console.error('Erro ao inserir dados na coleção "auctions":', error.message);
        throw error; 
    }
};

module.exports = {
    connectDB,
    insertIntoAuctions
};
