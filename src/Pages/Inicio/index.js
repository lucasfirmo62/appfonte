import React from "react";
import Menu from "../../Components/Menu"
import Footer from "../../Components/Footer"
import "./styles.css";

const Home = () => {


    return (
        <>
            <div className="back-wall">
                <Menu />
                <img src=""/>
                <div className="grid">
                    <div className="grid-inside">
                        <h1>Quem somos</h1>
                        <p>Somos um grupo de jovens da Assembléia de Deus em Campo Mourão no Paraná, da congregação do Jardim Aeroporto.</p>
                        <p>1 Coríntios 12:27</p>
                    </div>
                    <div className="grid-inside">
                        <h1>O que fazemos</h1>
                        <p>Cumprimos o ide, através de cultos mensais, devocionais quinzenais, Podcast semanais, evangelismos e outros.</p>
                        <p>Mateus 28:19-20</p>
                    </div>
                    <div className="grid-inside">
                        <h1>Porque fazemos</h1>
                        <p>Proclamamos Jesus, para que O conheçam, e então Ele seja glorificado.</p>
                        <p>Atos 17:26-28</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Home;