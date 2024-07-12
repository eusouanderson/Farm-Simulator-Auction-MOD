const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = 'mongodb+srv://eusouanderson:67983527@cluster0.fuidnmk.mongodb.net/farmSimulator?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const DataSchema = new mongoose.Schema({
  key: String,
  value: String
});

const Data = mongoose.model('Data', DataSchema);

app.post('/api/data', async (req, res) => {
  const { key, value } = req.body;
  const newData = new Data({ key, value });
  await newData.save();
  res.json(newData);
});

app.get('/api/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
