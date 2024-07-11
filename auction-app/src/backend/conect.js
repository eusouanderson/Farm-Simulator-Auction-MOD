const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://eusouanderson:67983527@cluster0.fuidnmk.mongodb.net/farmSimulator?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000, // Ajuste o tempo limite de conexão conforme necessário
        });
        console.log('Conexão ao MongoDB Atlas bem sucedida');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB Atlas:', error.message);
        process.exit(1); // Encerra o processo Node.js com falha
    }
};

connectDB(); // Chama a função para conectar ao MongoDB

module.exports = connectDB;
