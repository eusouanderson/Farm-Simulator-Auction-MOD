const mongoose = require('mongoose');
require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);


// Defina o URI de conexão do MongoDB
const MONGO_URI = process.env.MONGO_URI;

// Conecte-se ao MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Conexão ao MongoDB Atlas bem sucedida');

    // Defina um schema para um modelo
    const userSchema = new mongoose.Schema({
        nome: String,
        idade: Number
    });

    // Crie um modelo baseado no schema
    const Usuario = mongoose.model('Usuario', userSchema);

    // Exemplo de criação de um novo documento
    const novoUsuario = new Usuario({
        nome: 'Anderson',
        idade: 30
    });

    // Salve o novo documento no banco de dados
    novoUsuario.save().then(() => {
        console.log('Novo usuário salvo no banco de dados');
    }).catch((error) => {
        console.error('Erro ao salvar usuário:', error);
    });
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB Atlas:', error.message);
    process.exit(1); // Encerra o processo Node.js com falha
});
