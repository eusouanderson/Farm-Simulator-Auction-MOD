// test-mongo.js

const mongoose = require('mongoose');
const connectDB = require('./connect-db'); // Importe o arquivo que contém a função connectDB

// URI de conexão com o MongoDB
const MONGO_URI = 'mongodb+srv://eusouanderson:67983527@cluster0.fuidnmk.mongodb.net/FarmSimulatorBD?retryWrites=true&w=majority';

// Função para conectar ao MongoDB
const testConnectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Conexão ao MongoDB Atlas bem sucedida');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB Atlas:', error.message);
        process.exit(1); // Encerra o processo Node.js com falha
    }
};

// Chama a função para conectar ao MongoDB
testConnectDB();
