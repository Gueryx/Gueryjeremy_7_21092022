// Importation du model "post"
const Post = require('../models/Post');

// “File System” Permet de créer, gérer ou supp' des fichiers pour stocker ou lire 
// des fichiers dans un programme Node
const fs = require('fs');

// Creation d'un post
exports.createPost = (req, res) => {
    // parsé l'objet
    const postObject = JSON.parse(req.body.post);
    // Id valide
    delete postObject._id;
    delete postObject._userId;
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        description: req.auth.description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        comments: []
    });
    // Enregistrement du post dans la base de donnée
    post.save()
        // Réponse 201 : HTTP OK
        .then(post => res.status(201).json({ post }))
        // Erreur 400 : Bad request
        .catch(error => res.status(400).json({ error }));
};

// Modification d'un post, que sur la description
exports.modifyPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id unknown : " + req.params.id);

    const updateRecord = {
        description: req.body.description
    }

    Post.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else res.status(500).json({ err });
        }
    )
}

// exports.modifyPost = (req, res) => {
//     const postObject = req.file ? {
//         ...JSON.parse(req.body.post),
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };

//     // Mesure de sécurité, assignation de l'Id
//     delete postObject._userId;
//     // Récupération du bon id et la vérifier
//     Post.findOne({ _id: req.params.id })
//         .then((post) => {
//             if (post.userId != req.auth.userId) {
//                 res.status(403).json({ message: 'Unauthorized request' });
//             } else {
//                 Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
//                     .then(() => res.status(200).json({ message: 'Objet modifié.' }))
//                     .catch(error => res.status(401).json({ error }));
//                 // Erreur 401 : non autorisé 
//             }
//         })
//         .catch(error => res.status(400).json({ error }));
// };

// Supression d'un post
exports.deletePost = (req, res) => {
    // Vérification des droits
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé.' });
            } else {
                const filename = post.imageUrl.split('/images')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post supprimé.' }))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
    // Erreur 500 : erreur serveur
};

// Un post en particulier
exports.getOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

// Tout les posts
exports.getAllPost = (req, res) => {
    Post.find()
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

// Liked / Disliked
// 3 conditions possible via le frontend: 0, 1 ou -1 de req.body.like
exports.likePost = (req, res) => {
    switch (req.body.like) {

        // Le cas où req.body.like = 0
        case 0:
            Post.findOne({ _id: req.params.id })
                .then((post) => {

                    // On cherche si l'utilisateur est déjà dans le tableau usersLiked
                    if (post.usersLiked.find(user => user === req.body.userId)) {
                        // Si oui, on va mettre à jour le post avec le _id présent dans la requête
                        Post.updateOne({ _id: req.params.id }, {
                            // On décrémente la valeur des likes de 1 (soit -1)
                            $inc: { likes: -1 },
                            // Suppression de l'utilisateur dans le tableau
                            $pull: { usersLiked: req.body.userId }
                        })
                            .then(() => res.status(201).json({ message: "Vote OK." }))
                            .catch(error => res.status(400).json({ error }));
                    }

                    // Idem pour le tableau usersDisliked
                    if (post.usersDisliked.find(user => user === req.body.userId)) {
                        Post.updateOne({ _id: req.params.id }, {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId }
                        })
                            .then(() => res.status(201).json({ message: "Vote OK." }))
                            .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch(error => res.status(404).json({ error }));
            break;

        // Le cas où req.body.like = 1
        case 1:
            // On va rechercher le post avec le _id présent dans la requête
            Post.updateOne({ _id: req.params.id }, {
                // Changement de la valeur de likes par 1
                $inc: { likes: 1 },
                // On ajoute l'utilisateur dans le array usersLiked
                $push: { usersLiked: req.body.userId }
            })
                .then(() => res.status(201).json({ message: "Vote OK." })) // Code 201: created
                .catch(error => res.status(400).json({ error })); // Code 400: bad request
            break;

        // le cas où req.body.like = -1
        case -1:
            Post.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId }
            })
                .then(() => res.status(201).json({ message: "Vote OK." }))
                .catch(error => res.status(400).json({ error }));
            break;
        default:
            console.log("bad request");
    }
};