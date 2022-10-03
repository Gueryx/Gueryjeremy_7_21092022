// Connexions
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

// Importations
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

// Création application express
const app = express();

// Capture tout ce qui est en .json
app.use(express.json());

// Connexion à mongoDB
mongoose.connect(process.env.DB_USER_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Les autorisations de application
app.use((req, res, next) => {
    //Connexion pour tout le monde
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Autorisation pour certains en-tête
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Formes de requête possible
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());

// Enregistrement des routes
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

// Gestion de la ressource d'image de façon statique
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exporter cette application
module.exports = app;