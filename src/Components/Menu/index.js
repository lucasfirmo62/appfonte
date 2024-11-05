import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookBible, faHeadphones, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    var nameUser;

    const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    if (localStorage.getItem("nome")) {
        nameUser = localStorage.getItem("nome");
    }

    useEffect(() => {
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => {
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    const goToInico = () => {
        navigate('/');
    };

    const goToLogin = () => {

        if(nameUser){
            nameUser = {};
            localStorage.setItem("nome", "");
            navigate('/login');
        }else{
            navigate('/login');
        }

    };

    const goToCultos = () => {
        navigate('/livros');
    };

    const goToPodcast = () => {
        navigate('/podcast');
    };

    const goToDevocionais = () => {
        navigate('/biblia');
    };

    return (
        <div className="button-area">
            {/* Exibe ícone se for mobile, texto se não for */}
            <div className="button-inside" onClick={goToCultos}>
                {isMobile ? <FontAwesomeIcon icon={faBook} /> : "Livros"}
            </div>
            <div className="button-inside" onClick={goToDevocionais}>
                {isMobile ? <FontAwesomeIcon icon={faBookBible} /> : "BDevo"}
            </div>
            <img className="logo" src="/logo_black.png" alt="Logo" onClick={goToInico} />
            <div className="button-inside" onClick={goToPodcast}>
                {isMobile ? <FontAwesomeIcon icon={faHeadphones} /> : "Podcast"}
            </div>
            <div className="login-button" onClick={goToLogin}>
                {nameUser ? nameUser : (isMobile ? <FontAwesomeIcon icon={faSignInAlt} /> : "Entrar")}
            </div>
        </div>
    );
};

export default Menu;
