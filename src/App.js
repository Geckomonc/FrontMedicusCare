import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from './pages/Contact';
import Login from './pages/Login';
import Medicamentos from './pages/Medicamentos';
import RegistrarMedicamentos from './pages/RegistrarMedicamentos';
import Register from './pages/Register';
import PaginaPrincipal from './pages/PaginaPrincipal';
import Notificaciones from './pages/Notificaciones';
import Recomendaciones from './pages/Recomendaciones';
import Usuario from './pages/Usuario';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation(); // Obtener la ruta actual

  return (
    <>
      {/* Mostrar Navbar solo si no estamos en "/pagina-principal" */}
      {location.pathname !== '/pagina-principal' && location.pathname !== '/medicamentos' && location.pathname !== '/registrar-medicamentos' && location.pathname !== '/notificaciones' && location.pathname !== '/recomendations' && location.pathname !== '/usuarios' && <Navbar />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/pagina-principal' element={<PaginaPrincipal />} />
        <Route exact path='/medicamentos' element={<Medicamentos />} />
        <Route exact path='/recomendations' element={<Recomendaciones />} />
        <Route exact path='/registrar-medicamentos' element={<RegistrarMedicamentos />} />
        <Route exact path='/notificaciones' element={<Notificaciones />} />
        <Route exact path='/usuarios' element={<Usuario/>} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
      {/* Mostrar Footer solo si no estamos en "/pagina-principal" */}
      {location.pathname !== '/pagina-principal' && location.pathname !== '/medicamentos' && location.pathname !== '/registrar-medicamentos' && location.pathname !== '/notificaciones' && location.pathname !== '/recomendations' && location.pathname !== '/usuarios' && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;

