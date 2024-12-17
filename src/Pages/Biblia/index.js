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
    const [verseExplanation, setVerseExplanation] = useState(null); // Armazena a explicação do versículo
    const [verseExplanationRelas, setverseExplanationRelas] = useState(null); // Armazena a explicação do versículo
    const [verseExplanationWord, setverseExplanationWord] = useState(null); // Armazena a explicação do versículo
    const [isExplanationVisible, setIsExplanationVisible] = useState(false); // Estado para controlar a visibilidade da explicação
    const [selectedExplanationType, setSelectedExplanationType] = useState(null); // Controla qual tipo de explicação foi selecionado

    // URLs para cada versão da Bíblia
    const versionUrls = {
        NVI: "https://raw.githubusercontent.com/thiagobodruk/biblia/refs/heads/master/json/nvi.json",
        AA: "https://raw.githubusercontent.com/thiagobodruk/biblia/refs/heads/master/json/aa.json",
        ARA: "https://raw.githubusercontent.com/thiagobodruk/biblia/refs/heads/master/json/acf.json"
    };

    const fetchVerseExplanation = async (verseText) => {
        try {
            const params = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `Me explique o versículo ${verseText}, com no máximo 300 caracteres. Se exixtir, utilize referências de outras partes da biblia.`
                    }
                ],
                max_tokens: 100,
                temperature: 1,
            };

            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                params,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY_BIBLE}`,
                    }
                }
            );

            return response.data.choices[0].message.content.trim();  // Retorna a explicação

        } catch (error) {
            console.error("Erro ao buscar explicação:", error.response?.data || error.message);
            return "Não foi possível obter uma explicação no momento.";  // Mensagem de erro
        }
    };

    const fetchVerseExplanationVersesRelas = async (verseText) => {
        try {
            const params = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `Me indique versículos relacionados a ${verseText}, com um contexto semelhante ou de ligação. Não mostrar os versículos, só o livro, capitulo e verso.`
                    }
                ],
                max_tokens: 100,
                temperature: 1,
            };

            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                params,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.REACT_APP_KEY_BIBLE}`,
                    }
                }
            );

            return response.data.choices[0].message.content.trim();  // Retorna a explicação

        } catch (error) {
            console.error("Erro ao buscar explicação:", error.response?.data || error.message);
            return "Não foi possível obter uma explicação no momento.";  // Mensagem de erro
        }
    };

    const fetchVerseExplanationVersesWord = async (verseText) => {
        try {
            const params = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `Dentro do versículo ${verseText}, mostre palavras chaves e seus significados. Do original e lexico.`
                    }
                ],
                max_tokens: 100,
                temperature: 1,
            };

            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                params,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.REACT_APP_KEY_BIBLE}`,
                    }
                }
            );

            return response.data.choices[0].message.content.trim();  // Retorna a explicação

        } catch (error) {
            console.error("Erro ao buscar explicação:", error.response?.data || error.message);
            return "Não foi possível obter uma explicação no momento.";  // Mensagem de erro
        }
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
    const handleVerseSelect = async (verseText) => {
        setSelectedVerse(verseText);

        const explanation = await fetchVerseExplanation(verseText);
        setVerseExplanation(explanation);

        const explanationVerses = await fetchVerseExplanationVersesRelas(verseText);
        setverseExplanationRelas(explanationVerses);

        const explanationWord = await fetchVerseExplanationVersesWord(verseText)
        setverseExplanationWord(explanationWord)

        setIsExplanationVisible(true); // Exibe
    };

    // Manipulador para selecionar a versão
    const handleVersionSelect = (version) => {
        setSelectedVersion(version);
        setSelectedBook(0); // Redefine o livro para o início ao trocar a versão
        setSelectedChapter(0); // Redefine o capítulo
        setSelectedVerse(null); // Redefine o versículo
    };

    // Função para selecionar o tipo de explicação
    const handleExplanationSelect = (type) => {
        setSelectedExplanationType(type);
    };

    // Função para fechar a explicação
    const closeExplanation = () => {
        setIsExplanationVisible(false); // Esconde a explicação
        setSelectedExplanationType(null); // Reseta o tipo de explicação
    };

    return (
        <>
            <Menu />
            <h1 className='title-bible'>Bíblia Devocional</h1>
            <div className='app-bible'>
                {/* Botões para selecionar a versão da Bíblia */}
                {data ? (
                    <div>
                        <div className='bar-conf-bible'>
                            <div className="version-selectors">
                                <select
                                    value={selectedVersion}
                                    onChange={(e) => handleVersionSelect(e.target.value)}
                                >
                                    <option value="NVI">NVI</option>
                                    <option value="AA">AA</option>
                                    <option value="ARA">ARA</option>
                                </select>
                            </div>
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
                            </div>
                        </div>


                        {data[selectedBook].chapters[selectedChapter].map((verse, index) => (
                            <p
                                className='text-verse'
                                key={index}
                                onClick={() => handleVerseSelect(verse)} // Busca a explicação ao clicar
                                style={{ cursor: "pointer" }} // Indica que o texto é clicável
                            >
                                <strong className='verse-intro'>{index + 1} </strong>
                                {verse}
                            </p>
                        ))}

                        {/* Exibir a explicação do versículo */}
                        {isExplanationVisible && verseExplanation && verseExplanationRelas && (
                            <div className="verse-explanation">
                                <button className="close-button" onClick={closeExplanation}>Ocultar</button>

                                <div className='toltips-verses'>
                                    <h3 className='button-verse-explanations' onClick={() => handleExplanationSelect('explanation')}>Explicação do Versículo</h3>
                                    <h3 className='button-verse-explanations' onClick={() => handleExplanationSelect('related')}>Versículos relacionados</h3>
                                    <h3 className='button-verse-explanations' onClick={() => handleExplanationSelect('keywords')}>Palavras chave</h3>
                                </div>

                                {/* Mostra a explicação, baseado na opção selecionada */}
                                {selectedExplanationType === 'explanation' && <p>{verseExplanation}</p>}
                                {selectedExplanationType === 'related' && <p>{verseExplanationRelas}</p>}
                                {selectedExplanationType === 'keywords' && <p>{verseExplanationWord}</p>}
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
