import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
        <div className="headerContainer">
        <h1> Medicus Care </h1>
        <p> Para el correcto manejo de la salud</p>
        <Link to="/login">
            <button> Iniciar sesión </button>
        </Link>
        </div>
    </div>
  )
}

export default Home