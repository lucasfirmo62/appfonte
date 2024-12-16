import React, { useEffect } from "react";
import Menu from "../../Components/Menu";
import Footer from "../../Components/Footer";
import "./styles.css";

const Home = () => {


    return (
        <>
            <div className="back-wall">
                <Menu />
                <div>
                    <img
                        id="video-home"
                        src="https://dl.dropboxusercontent.com/scl/fi/mmheqvuyjeszj4m71djko/appPreview.gif?rlkey=lem13m9g5vcoytla3skwq6ii4&st=2xgc0wqz&dl=0"
                        className="banner-home"
                    />
                    <img src="/bgsite.png" className="mod-bank" alt="Background" />
                </div>
                <div className="grid">
                    <div className="grid-inside">
                        <h1>Quem somos</h1>
                        <p>
                            Somos um grupo de jovens da Assembleia de Deus em Campo Mourão no
                            Paraná, da congregação do Jardim Aeroporto.
                        </p>
                        <p>1 Coríntios 12:27</p>
                    </div>
                    <div className="grid-inside">
                        <h1>O que fazemos</h1>
                        <p>
                            Cumprimos o ide, através de cultos mensais, devocionais quinzenais,
                            Podcast semanais, evangelismos e outros.
                        </p>
                        <p>Mateus 28:19-20</p>
                    </div>
                    <div className="grid-inside">
                        <h1>Porque fazemos</h1>
                        <p>
                            Proclamamos Jesus, para que O conheçam, e então Ele seja glorificado.
                        </p>
                        <p>Atos 17:26-28</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;