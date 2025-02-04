
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación
import Logo from "../assets/chequeo-de-salud.png";
import "../styles/Sidebar.css";

function Sidebar() {
  const { logout } = useAuth(); // Obtener la función logout del contexto
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handleLogout = () => {
    logout(); // Cierra la sesión eliminando el token
    setTimeout(() => {
      navigate("/login"); // Redirige después de un pequeño retraso
    }, 100);
  };

  return (
    <div className="sidebar">
      <div>
        <div className='information'>
          <h2>Medicus Care</h2>
          <p>Para el correcto manejo de la salud</p>
          <img src={Logo} alt="Medicus Care Logo" />
        </div>
        <nav className='options'>
          <Link to="/medicamentos">Medicamentos</Link>
          <Link to="/recomendations">Recomendaciones</Link>
          <Link to="/registrar-medicamentos">Registrar medicamentos</Link>
          <Link to="/notificaciones">Notificaciones</Link>
          <Link to="/usuarios">Usuarios</Link>
        </nav>
      </div>
      <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Sidebar;
