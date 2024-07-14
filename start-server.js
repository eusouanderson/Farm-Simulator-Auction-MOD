require('dotenv').config();
const { exec } = require('child_process');

exec('nodemon ./backend/conect.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Erro ao iniciar o servidor: ${err}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
