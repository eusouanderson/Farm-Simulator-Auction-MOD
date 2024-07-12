const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB
const MONGO_URI = 'mongodb+srv://eusouanderson:67983527@cluster0.fuidnmk.mongodb.net/farmSimulator?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar com o MongoDB:', err));

// Definição do Schema e Model
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

app.use(bodyParser.json({ limit: '20mb' }));

// Endpoint para criar um novo leilão
app.post('/api/auctions', async (req, res) => {
  try {
    const newAuction = await Auction.create(req.body); // Utiliza create() para inserir um novo leilão
    res.status(201).json(newAuction); // Retorna o leilão criado com o status 201 Created
  } catch (err) {
    console.error('Erro ao salvar o leilão:', err);
    res.status(500).json({ message: 'Erro ao salvar o leilão', error: err });
  }
});

app.get('/api/getauctions', async (req, res) => {
  try {
    const auctions = await Auction.find(); // Busca todos os leilões no MongoDB
    res.json(auctions); // Retorna os leilões encontrados como JSON
  } catch (err) {
    console.error('Erro ao buscar leilões:', err);
    res.status(500).json({ message: 'Erro ao buscar leilões', error: err });
  }
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
