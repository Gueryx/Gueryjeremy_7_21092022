import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Post from '../pages/Post';
import Signup from '../pages/Signup';

const App = () => {
    return (
        < BrowserRouter >
            <Routes>
                {/* path='*' si l'url n'est pas connue/déclarée */}
                <Route path='*' element={<Login />} />
                {/* Pour l'url de Signup  */}
                <Route path='/signup' element={<Signup />} />
                {/* Pour l'url de connexion Login  */}
                <Route path='/login' element={<Login />} />
                {/* Pour l'url HomePage  */}
                <Route path='/accueil' element={<Home />} />
                {/* Pour l'url de Post/Form nouveau post */}
                <Route path='/post' element={<Post />} />
            </Routes>
        </BrowserRouter >
    );
};

export default App;