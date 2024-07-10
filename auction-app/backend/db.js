const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
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

module.exports = connectDB;
