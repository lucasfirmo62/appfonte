import React, { useRef, useState, useEffect } from 'react';
import './styles.css';

const Footer = () => {

    const goToInstagram = () => {
        window.location.href = "https://www.instagram.com/fonte.ieadcm/"
    }

    return (
        <div className='content-out-footer'>
            <div className='footer-content'>
                <div onClick={goToInstagram} className='button-social'>
                    <p>INSTAGRAM</p>
                    <img className='logo-social' src='/instagram.png'/>
                </div>
            </div>
        </div>
    );
};

export default Footer;
