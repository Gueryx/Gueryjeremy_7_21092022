import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        // A l'évènement tu ne recharges pas la page
        e.preventDefault();

        // Alerte Email & Password en cas d'erreur de frappe
        const emailError = document.querySelector('.emailError');
        const passwordError = document.querySelector('.passwordError');

        // AXIOS Permet de communiquer avec l'API
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            // withCredentials: true,
            data: { email, password, },
        })
            // Si il y a une/des erreur(s) dans la data
            .then((res) => {

                if (res.data.errors) {
                    console.log(res);
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = '/';
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form action="" onSubmit={handleLogin} id="signup-form">

            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                // stoker la valeur du input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="emailError"></div>

            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name='password' id='password'
                // stoker la valeur du input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="passwordError"></div>

            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default SignInForm;