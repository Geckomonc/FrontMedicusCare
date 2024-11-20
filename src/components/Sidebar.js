import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/chequeo-de-salud.png";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
        <div>
          <div className='information'>
            <h2>Medicus Care</h2>
            <p>Para el correcto manejo de la salud</p>
            <img src={Logo} />
          </div>
          <nav className='options'>
            <Link to="/medicamentos">Medicamentos</Link>
            <Link to="/recomendations">Recomendaciones</Link>
            <Link to="/registrar-medicamentos">Registrar medicamentos</Link>
            <Link to="/notificaciones">Notificaciones</Link>
            <Link to="/usuarios">Usuarios</Link>
          </nav>
        </div>
        <button className="logout">Cerrar sesión</button>
    </div>
  )
}

export default Sidebar