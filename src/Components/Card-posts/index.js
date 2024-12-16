import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CardPosts = () => {
  const [cultoData, setCultoData] = useState([]); // Estado para armazenar todos os dados dos cultos
  const [loading, setLoading] = useState(true);    // Estado para indicar se os dados estão sendo carregados
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.npoint.io/43440e75d54345bdda47');  // Ajuste o URL conforme necessário
        const data = await response.json();
        setCultoData(data.componentes);  // Armazena todos os componentes
        setLoading(false);               // Marca que os dados foram carregados
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setLoading(false); // Mesmo que haja um erro, parar o loading
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!cultoData.length) {
    return <p>Erro ao carregar dados do culto.</p>;
  }

  const goBook = (id) => {
    //navigate('/livro-' + id);
  };

  return (
    <div className='card-posts-container'>
      {cultoData.map((item, index) => (
        <div key={index} className='card-posts' onClick={() => goBook(item.id)}>
          {item.foto && <img className="poster-book" src={item.foto} alt={`Foto do culto ${index + 1}`} />}
          <div className='grid-books'>
            <div className="about-book">
              <p className="title-book">{item.tema}</p>
              <p className="about-book-text">{item.sobre}</p>
              <p className="sattus-book">Indisponível</p>
              <div>
                <p>Quem está lendo?</p>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardPosts;