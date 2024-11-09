import React from "react";
import Multiple from "../assets/animated-geriatrics.jpg";
import "../styles/About.css";
function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${Multiple})` }}
      ></div>
      <div className="aboutBottom">
        <h1> Acerca de nosotros</h1>
        <p>
        Bienvenidos a Medicus Care, 
        una herramienta diseñada para simplificar y 
        mejorar el cuidado de la salud de toda la familia. 
        Sabemos que administrar medicamentos y 
        recordar citas médicas puede ser un desafío, 
        especialmente cuando se trata de múltiples miembros 
        de la familia o de personas mayores. Por eso, en 
        Medicus Care estamos comprometidos en 
        brindar una solución sencilla, segura y confiable
         para que el bienestar de tus seres queridos 
         siempre esté en primer lugar.
        </p>
      </div>
    </div>
  );
}

export default About;