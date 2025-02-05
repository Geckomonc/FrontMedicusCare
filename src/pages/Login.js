import React, { useState } from "react";
import "../styles/Login.css";
import { signIn } from "../request/request";
import { useAuth } from "../context/AuthContext"; 
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notifySuccess = () => toast.success("Has iniciado sesión con éxito");
  const notifyError = (message) => toast.error(`Usuario o contraseña incorrectas`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const response = await signIn(user);
      console.log(response);
      
      if (response.id && response.id_patient) {
        // Guarda el ID del usuario en localStorage
        localStorage.setItem("id", response.id);
        localStorage.setItem("patient", response.id_patient);

        // Llama a login pasándole el ID o el token
        login(response.id);
        console.log(localStorage.getItem("patient"));
        
        notifySuccess(); // Llama a la notificación
        setTimeout(() => navigate("/pagina-principal"), 2500);
      } else {
        console.log("Entro al else");
        notifyError("Inicio de sesión fallido.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      notifyError("Ocurrió un error en el inicio de sesión.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Inicio de sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Iniciar sesión</button>
          <Link to="/register">
            <button type="button" className="register-button">Crear cuenta</button>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
