import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../Components/Menu";
import PlayerPodcast from "../../Components/PlayerPodcast";
import Footer from "../../Components/Footer";
import "./styles.css";

const Podcast = () => {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        axios.get('https://api.npoint.io/82aa8042d217c735e7a0')
            .then(response => {
                setEpisodes(response.data.episodes);
            })
            .catch(error => {
                console.error("Erro ao carregar os episódios:", error);
            });
    }, []);

    function goTo(){
        window.location.href = "https://www.youtube.com/@fonte.ieadcm/videos"
    }

    function goToS(){
        window.location.href = "https://open.spotify.com/show/5FE20sK9pm1hyIKwOCOT4c?si=0e702cea639c438d"
    }

    return (
        <>
            <div className="back-wall">
                <Menu />
                <div>
                    <h1>Podcast</h1>
                    <p className="about-page">Assista por aqui, ou na sua plataforma preferida o Podcast de entrevistas.</p>
                    <div className="streamings">
                        <div className="content-streaming" onClick={() => goToS()}>
                            <img className="logo-streams" src="/Spotify.png" alt="Spotify" />
                            <p>Spotify</p>
                        </div>
                        <div className="content-streaming">
                            <img className="logo-streams" src="/Deezer.webp" alt="Deezer" />
                            <p>Deezer</p>
                        </div>
                        <div className="content-streaming" onClick={() => goTo()}>
                            <img className="logo-streams" src="/youtube.png" alt="Youtube" />
                            <p>Youtube</p>
                        </div>
                    </div>
                    <div className="align-here">

                        <div className="watch-here">
                            <p className="title-here">Ouça por aqui</p>
                            {episodes.map((episode) => (
                                <PlayerPodcast
                                    key={episode.id}
                                    tema={episode.tema}
                                    data={episode.data}
                                    autor={episode.autor}
                                    audio={episode.audio}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Podcast;
