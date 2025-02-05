import React, { useState } from "react";
import Health from "../assets/healthcare-heart-beat-4rg8v86gvhzdl30y.jpg";
import "../styles/Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendContactMessage } from "../request/request";  // Importa la función

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendContactMessage(formData);  // Usa la nueva función
      toast.success("Mensaje enviado exitosamente.");
      setFormData({ name: "", email: "", message: "" });  // Limpia el formulario
    } catch (error) {
      toast.error("Error al enviar el mensaje. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className="contact">
      <div className="leftSide" style={{ backgroundImage: `url(${Health})` }}></div>
      <div className="rightSide">
        <h1>Comunícate con nosotros</h1>
        <form id="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre Completo</label>
          <input
            name="name"
            placeholder="Ingrese su nombre..."
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="Ingrese su email..."
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Mensaje</label>
          <textarea
            rows="6"
            placeholder="Ingrese su mensaje..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Enviar mensaje</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Contact;
