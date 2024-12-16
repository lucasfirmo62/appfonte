import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const goToBack = () => {
        navigate(-1);
    };

    function cutName(texto) {
        const indiceEspaco = texto.indexOf(' ');
        if (indiceEspaco === -1) {
            return texto.toLowerCase(); 
        }

        texto = texto.toLowerCase()

        return texto.substring(0, indiceEspaco);

    }

    const enter = async () => {
        const name = document.getElementById('name').value;
        const passDateBorn = document.getElementById('dateBorn').value;

        const response = await fetch('https://api.npoint.io/dea945c838e2e01b9091'); 
        const data = await response.json();

        const found = data.componentes.some(item => {
            var firtsName = cutName(item.nome);
            localStorage.setItem("nome", item.nome.toUpperCase());
            return firtsName === name && item.data_nascimento === passDateBorn;
        });

        if (found) {
            navigate('/');
        } else {
            setError('Nome ou data de nascimento inválidos.');
        }
    };

    return (
        <>
            <div className="box-login">
                <div className="box-style">
                    <div className="back" onClick={goToBack}>VOLTAR</div>
                    <input id="name" className="input-custom" placeholder="Seu primeiro nome" />
                    <input id="dateBorn" className="input-custom" placeholder="Data de nascimento 00/00/0000" />
                    <div onClick={enter} className="button">ENTRAR</div>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </>
    );
}

export default Login;
