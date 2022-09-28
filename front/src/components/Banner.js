import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';


const Banner = () => {
    return (
        <div className='banner'>
            <header> <h1>Réseau social</h1></header>

            <img className='banner__logo' src="/images/icon-left-font-monochrome-white.png" alt="Logo d'entreprise" />

            <nav className='banner__button'>
                <Link className="banner__button__set" to="/Signup">Signup</Link>
                <Link className="banner__button__set" to="/Login">Login</Link>
            </nav>

        </div>
    );
};

export default Banner;