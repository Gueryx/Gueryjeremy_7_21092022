// Connexion à mongoose
const mongoose = require('mongoose');

// Création d'un schéma de données
const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    likes: { type: Number, defaut: 0 },
    dislikes: { type: Number, defaut: 0 },
    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required: false },
    timestamps: true,
    comments: {
        type:
            [{
                commenterId: String,
                commenterPseudo: String,
                text: String,
                timestamps: Number
            }],
        required: true,
    }
});

//Exporter le model 
module.exports = mongoose.model('Post', postSchema);