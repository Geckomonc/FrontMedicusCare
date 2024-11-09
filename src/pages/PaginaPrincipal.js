import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/PaginaPrincipal.css';

function PaginaPrincipal() {
  return (
    <div className="pagina-principal">
      <Sidebar />
      <div className="content">
        <header className="header">
          <h1>Inicio</h1>
          <div className="user-info">
            <FaUserCircle />
            <span>ejemplo@email.co</span>
          </div>
        </header>
        <div className="main-content">
          <p>Bienvenido al sistema.</p>
        </div>
      </div>
    </div>
  );
}

export default PaginaPrincipal;
