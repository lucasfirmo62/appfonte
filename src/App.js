import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Inicio";
import Login from "./Pages/Login";
import Livros from "./Pages/Cultos";
import Podcast from './Pages/Podcast';
import Biblia from './Pages/Biblia';
import Conf from './Pages/Configuracao'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/biblia" element={<Biblia />} />
        <Route path="/Configuracao" element={<Conf />} />
      </Routes>
    </Router>
  );
}

export default App;