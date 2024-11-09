import React from "react";
import Health from "../assets/healthcare-heart-beat-4rg8v86gvhzdl30y.jpg";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${Health})` }}
      ></div>
      <div className="rightSide">
        <h1> Comunicate con nosotros</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name">Nombre Completo</label>
          <input name="name" placeholder="Ingrese su nombre..." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" />
          <label htmlFor="message">Mensaje</label>
          <textarea
            rows="6"
            placeholder="Ingrese el mensaje..."
            name="message"
            required
          ></textarea>
          <button type="submit"> Enviar mensaje</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;