// Connexion au plugin jsonwebtoken
const jwt = require('jsonwebtoken');

// Récupération du TOKEN
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const pseudo = decodedToken.pseudo;
        req.auth = {
            userId: userId,
            pseudo: pseudo
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};