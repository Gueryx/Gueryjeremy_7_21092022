// Importations
import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {

    // Mise en place des Regex
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const validPassword = new RegExp('[a-zA-Z0-9]');

    // Hook = est une fonction qui permet de se brancher sur des fonctionnalités React
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messError, setMessError] = useState(false);

    // Voir si on doit afficher un message d'erreur
    const validate = () => {
        if (!validEmail.test(email)) {
            setMessError(true);
        }
        if (!validPassword.test(password)) {
            setMessError(true);
        }
    };

    const handleSignup = (e) => {
        // A l'évènement tu ne recharges pas la page
        e.preventDefault();

        // AXIOS Permet de communiquer avec l'API
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
            // withCredentials: true,
            data: { pseudo, email, password, },
        })
            .then((res) => {
                if (!validate) {
                    console.log(res);
                } else {
                    window.location = "/";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form action="" onSubmit={handleSignup} id="signup-form">

            <label htmlFor="name">Pseudo</label>
            <br />
            <input
                type="text"
                name="pseudo"
                id="pseudoConnect"
                className='sign'
                // stoker la valeur du input
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
            />

            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="emailConnect"
                className='sign'
                // stoker la valeur du input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password"
                name='password'
                id='passwordConnect'
                className='sign'
                // stoker la valeur du input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            {messError && <p className='messError'>Email ou mot de passe non valide</p>}

            <button className='btnConnect' onClick={validate}>Connexion</button>
        </form>
    );
};

export default SignUpForm;