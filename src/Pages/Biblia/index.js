import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../Components/Menu';
import Footer from "../../Components/Footer";
import "./styles.css";

const BibleReader = () => {
    const [data, setData] = useState(null);
    const [selectedVersion, setSelectedVersion] = useState("NVI"); // Versão inicial
    const [selectedBook, setSelectedBook] = useState(0); // Índice do livro inicial
    const [selectedChapter, setSelectedChapter] = useState(0); // Capítulo inicial
    const [selectedVerse, setSelectedVerse] = useState(null); // Versículo inicial (null quando nenhum versículo está selecionado)

    // URLs para cada versão da Bíblia
    const versionUrls = {
        NVI: "https://raw.githubusercontent.com/thiagobodruk/biblia/refs/heads/master/json/nvi.json",
        AA: "https://raw.githubusercontent.com/thiagobodruk/biblia/refs/heads/master/json/aa.json",
        ARA: "https://raw.githubusercontent.com/thiagobodruk/biblia/refs/heads/master/json/acf.json"
    };

    // Função para buscar dados com base na versão selecionada
    const fetchData = async (version) => {
        try {
            const response = await axios.get(versionUrls[version]);
            setData(response.data);
        } catch (error) {
            console.error('Erro ao buscar os dados', error);
        }
    };

    // Carregar dados ao montar o componente e ao mudar a versão
    useEffect(() => {
        fetchData(selectedVersion);
    }, [selectedVersion]);

    // Manipulador para selecionar livros
    const handleBookSelect = (event) => {
        setSelectedBook(Number(event.target.value));
        setSelectedChapter(0);
        setSelectedVerse(null);
    };

    // Manipulador para selecionar capítulos
    const handleChapterSelect = (event) => {
        setSelectedChapter(Number(event.target.value));
        setSelectedVerse(null);
    };

    // Manipulador para selecionar versículos
    const handleVerseSelect = (event) => {
        setSelectedVerse(Number(event.target.value));
    };

    // Manipulador para selecionar a versão
    const handleVersionSelect = (version) => {
        setSelectedVersion(version);
        setSelectedBook(0); // Redefine o livro para o início ao trocar a versão
        setSelectedChapter(0); // Redefine o capítulo
        setSelectedVerse(null); // Redefine o versículo
    };

    return (
        <>
            <Menu />
            <h1>Bíblia Devocional</h1>
            <div className='app-bible'>
                {/* Botões para selecionar a versão da Bíblia */}

                {data ? (
                    <div>
                        <div className="version-selectors">
                            <button className='button-bible' onClick={() => handleVersionSelect("NVI")}>NVI</button>
                            <button className='button-bible' onClick={() => handleVersionSelect("AA")}>AA</button>
                            <button className='button-bible' onClick={() => handleVersionSelect("ARA")}>ARA</button>
                        </div>
                                <center><button className='back-cap-full' onClick={() => setSelectedVerse(null)}>Ver Capítulo Inteiro</button></center>
                        <div className='filters-selectors'>
                            <select value={selectedBook} onChange={handleBookSelect}>
                                {data.map((book, index) => (
                                    <option key={index} value={index}>
                                        {book.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='filters-selectors'>
                            <select value={selectedChapter} onChange={handleChapterSelect}>
                                {data[selectedBook].chapters.map((chapter, index) => (
                                    <option key={index} value={index}>
                                        Capítulo {index + 1}
                                    </option>
                                ))}
                            </select>

                            {/* Selecionar Versículo */}
                            <select value={selectedVerse !== null ? selectedVerse : ''} onChange={handleVerseSelect}>
                                <option value="">Selecione um versículo</option>
                                {data[selectedBook].chapters[selectedChapter].map((verse, index) => (
                                    <option key={index} value={index}>
                                        Versículo {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Exibir o Versículo Selecionado e ocultar o restante do capítulo */}
                        {selectedVerse !== null && (
                            <>
                                <div className='content-verses'>
                                    <p>
                                        <strong className='verse-intro'>{selectedVerse + 1} </strong>
                                        {data[selectedBook].chapters[selectedChapter][selectedVerse]}
                                    </p>
                                </div>
                            </>
                        )}

                        {/* Mostrar o Capítulo Inteiro apenas se nenhum versículo estiver selecionado */}
                        {selectedVerse === null && (
                            <div>
                                <div className='content-verses'>
                                    <div className='intro-content-verses'>
                                        {data[selectedBook].chapters[selectedChapter].map((verse, index) => (
                                            <p className='text-verse' key={index}>
                                                <strong className='verse-intro'>{index + 1} </strong>
                                                {verse}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Carregando dados da bíblia devocional...</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default BibleReader;
