const mongoose = require('mongoose');

// Conecta ao MongoDB
const MONGO_URI = 'mongodb+srv://eusouanderson:67983527@cluster0.fuidnmk.mongodb.net/farmSimulator?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar com o MongoDB:', err));

// Define o Schema e Model
const AuctionSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  startingBid: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  timeRemaining: { type: Number, required: true },
  timeCurrent: { type: Number, required: true },
  description: { type: String, default: '' }
});

const Auction = mongoose.model('Auction', AuctionSchema);

// Função para ler todos os leilões
async function getAllAuctions() {
  try {
    const auctions = await Auction.find(); // Encontra todos os documentos na coleção Auction
    return auctions;
  } catch (err) {
    console.error('Erro ao buscar leilões:', err);
    throw err; // Lança o erro para ser tratado onde a função for chamada
  }
}

// Exemplo de uso da função para teste
async function test() {
  try {
    const auctions = await getAllAuctions();
    console.log('Leilões encontrados:', auctions);
  } catch (err) {
    console.error('Erro durante o teste:', err);
  } finally {
    mongoose.disconnect(); // Fecha a conexão com o MongoDB ao final do teste
  }
}

// Executa o teste (opcional, pode ser removido após testar)
test();

module.exports = {
  getAllAuctions
};
