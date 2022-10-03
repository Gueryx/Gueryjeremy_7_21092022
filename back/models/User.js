// Connexion à mongoose
const mongoose = require('mongoose');
// Ajout du plugin 'unique-validator' à notre schema
const uniqueValidator = require('mongoose-unique-validator');

// Création schéma utilisateur
const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true, minLength: 3, maxLength: 20, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
},
    { timestamps: true }
);

// On applique 'uniqueValidator' au schema
userSchema.plugin(uniqueValidator);

// Exporter le schema sous forme de model
module.exports = mongoose.model('User', userSchema);