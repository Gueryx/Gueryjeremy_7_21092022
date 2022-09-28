// Connexion http
const http = require('http');
// Importation de l'app.js
const app = require('./app');

// Sur quel port l'application fonctionne
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);