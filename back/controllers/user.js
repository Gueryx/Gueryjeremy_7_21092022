// Connexion au package de cryptage des mdp by bcrypt
const bcrypt = require('bcrypt');
// Connexion au package jsonwebtoken
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

// Model User
const User = require('../models/User');

// Fonction signup pour l'enregistrement d'un nouveau utilisateur
exports.signup = (req, res) => {
    //hachage du mdp
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            });
            // Enregistrement de l'utilisateur dans la base de donnée
            user.save()
                // Code 201 création de ressource
                .then(() => res.status(201).json({ message: 'Utilisateur créé.' }))
                // Erreur 500 c'est une erreur serveur
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction login pour connecter les utilisateurs existant
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Identifiant/mot de passe incorrecte' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Identifiant/mot de passe incorrecte' });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({ userId: user._id, pseudo: user.pseudo },
                                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction logout pour déconnecter un utilisateur
exports.logout = async (req, res) => {

}

// Recherche tout les users sans afficher les pwd
exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
}

// Aller chercher un utilisateur
exports.getOneUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id non reconnu : ' + req.params.id)

    User.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log(err);
    }).select('-password');
};

// Mettre à jour un profil
exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id non reconnu : ' + req.params.id)
    try {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

// Supression d'un utilisateur
exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id non reconnu : ' + req.params.id)
    try {
        await User.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Utilisateur supprimé" })
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};