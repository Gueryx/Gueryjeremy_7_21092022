// Multer = package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
// Connexion
const multer = require('multer');

// Les formats d'images
const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

// Configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Nomage du fichier unique
    filename: (req, file, callback) => {
        // Enlever le problème des spaces
        const name = file.originalname.split(' ').join('_');
        // Extension au fichier
        const extension = MINE_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');