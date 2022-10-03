import React from 'react';
import Log from '../components/Log';

const Profil = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
                {/* props */}
                <Log signin={false} signup={true} />
                <div className="img-container">
                    <img src="/images/icon-left-font-monochrome-black.png" alt="logo entreprise" />
                </div>
            </div>
        </div>
    );
};

export default Profil;