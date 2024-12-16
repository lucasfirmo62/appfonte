import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookBible, faHeadphones, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const isMobileDevice = () => /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
const isPWA = () => (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone;

const Menu = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [isAppPWA, setIsAppPWA] = useState(false);
    const [showDownloadBanner, setShowDownloadBanner] = useState(true);  // Novo estado para controlar a visibilidade do banner
    var nameUser;

    const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    if (localStorage.getItem("nome")) {
        nameUser = localStorage.getItem("nome");
    }

    useEffect(() => {
        checkIfMobile();
        setIsAppPWA(isPWA());  // Detecta se o app está rodando como PWA
        setIsMobile(isMobileDevice()); // Detecta se está em um dispositivo móvel

        window.addEventListener("resize", checkIfMobile);
        return () => {
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    const goToInico = () => {
        navigate('/');
    };

    const goToLogin = () => {
        if (nameUser) {
            nameUser = {};
            localStorage.setItem("nome", "");
            navigate('/login');
        } else {
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

    // Função para fechar o banner
    const closeDownloadBanner = () => {
        setShowDownloadBanner(false);
    };

    return (
        <div className="menu-container">
            <div className="button-area">
                <div className="button-inside" onClick={goToCultos}>
                    {isMobile ? <FontAwesomeIcon icon={faBook} /> : "Livros"}
                </div>
                <div className="button-inside" onClick={goToDevocionais}>
                    {isMobile ? <FontAwesomeIcon icon={faBookBible} /> : "BDevo"}
                </div>
                <div>
                    {isMobile ? <img className="logo" src="/logo_black1.png" alt="Logo" onClick={goToInico} /> : <img className="logo" src="/logo_black.png" alt="Logo" onClick={goToInico} />}
                </div>
                <div className="button-inside" onClick={goToPodcast}>
                    {isMobile ? <FontAwesomeIcon icon={faHeadphones} /> : "Podcast"}
                </div>
                <div className="login-button" onClick={goToLogin}>
                    {nameUser ? nameUser : (isMobile ? <FontAwesomeIcon icon={faSignInAlt} /> : "Entrar")}
                </div>
            </div>
            
            {isMobile && !isAppPWA && showDownloadBanner && (
                <div className="verse-explanation">
                    <div className="download-banner">
                    <p>Baixar aplicativo</p>
                    <div>
                    <h1>Android</h1>
                        <center>
                            <p className="install">Clique nos 3 pontos no navegador, e clique na opção "Adicionar á tela de inicio".</p>
                        </center>
                    </div>
                    <div>
                    <h1>iOS</h1>
                        <center>
                            <p className="install">Clique no <img className="install-ios" src="/install.png" alt="Logo" onClick={goToInico} />, e aperte em "Adicionar á Tela de inicio".</p>
                        </center>
                    </div>
                    <p className="close-button" onClick={closeDownloadBanner}>CONTINUAR POR AQUI</p>
                </div>
                    </div>
            )}
        </div>
    );
};

export default Menu;
