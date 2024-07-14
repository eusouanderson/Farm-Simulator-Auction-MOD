const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB
const MONGO_URI = `mongodb+srv://${process.env.USER_LOGIN}:${process.env.USER_PASSWORD}@cluster0.fuidnmk.mongodb.net/farmSimulator?retryWrites=true&w=majority`;
console.log(MONGO_URI)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar com o MongoDB:', err));

// Definição do Schema e Model
const AuctionSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  startingBid: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  timeRemaining: { type: Number, required: true },
  timeCurrent: { type: Number, required: true },
  winner: { type: String, default: '' },
  lastSpear: { type: String, default: '' },
  description: { type: String, default: '' }
});

const Auction = mongoose.model('Auction', AuctionSchema);

app.use(bodyParser.json({ limit: '140mb' }));

app.post('/api/auctions', async (req, res) => {
  try {
    const newAuction = await Auction.create(req.body);
    res.status(201).json(newAuction);
  } catch (err) {
    console.error('Erro ao salvar o leilão:', err);
    res.status(500).json({ message: 'Erro ao salvar o leilão', error: err });
  }
});

app.put('/api/updateauction/:id', async (req, res) => {
  const { id } = req.params;
  const { timeRemaining, timeCurrent, winner, startingBid } = req.body;

  try {
    let updateFields = {};
    if (timeRemaining !== undefined) {
      updateFields.timeRemaining = timeRemaining;
    }
    if (timeCurrent !== undefined) {
      updateFields.timeCurrent = timeCurrent;
    }
    if (winner !== undefined) {
      updateFields.winner = winner;
    }
    if (startingBid !== undefined) {
      updateFields.startingBid = startingBid;
    }

    const updatedAuction = await Auction.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedAuction) {
      return res.status(404).json({ message: 'Leilão não encontrado' });
    }
    res.json(updatedAuction);
  } catch (err) {
    console.error('Erro ao atualizar leilão:', err);
    res.status(500).json({ message: 'Erro ao atualizar leilão', error: err });
  }
});

app.get('/api/getauctions', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (err) {
    console.error('Erro ao buscar leilões:', err);
    res.status(500).json({ message: 'Erro ao buscar leilões', error: err });
  }
});

app.delete('/api/deleteauctions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAuction = await Auction.findByIdAndDelete(id);
    if (!deletedAuction) {
      return res.status(404).json({ message: 'Leilão não encontrado' });
    }
    res.json({ message: 'Leilão deletado com sucesso', deletedAuction });
  } catch (err) {
    console.error('Erro ao deletar leilão:', err);
    res.status(500).json({ message: 'Erro ao deletar leilão', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
