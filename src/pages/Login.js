import React, { useState } from "react";
import "../styles/Login.css";
import {signIn} from "../request/request";
import { useAuth } from '../context/AuthContext'; 
import { Link, useNavigate} from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const response = await signIn(user);
      console.log(response);
      if (response.email) {
        // Guarda el token en localStorage o cookies
        //localStorage.setItem("token", response.email);
        login(response.email);
        // Redirige a la página principal
        console.log("Entro al if");
        navigate("/pagina-principal");
      } else {
        console.log("Entro al elsa");
        alert(response);
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Ocurrió un error en el inicio de sesión.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Inicio de sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor="password">Password</label>
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
    </div>
  );
}

export default Login;
