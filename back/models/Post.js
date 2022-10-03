// Connexion à mongoose
const mongoose = require('mongoose');

// Création d'un schéma de données
const postSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        likes: { type: Number, defaut: 0 },
        dislikes: { type: Number, defaut: 0 },
        usersLiked: { type: Array },
        usersDisliked: { type: Array },
        comments: { type: [{ commenterId: String, commenterPseudo: String, text: String, timestamps: Number }] },
    },
    { timestamps: true, }
);

//Exporter le model 
module.exports = mongoose.model('Post', postSchema);