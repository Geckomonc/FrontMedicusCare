import React from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <h2>Inicio de sesión</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
          />
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
          />
          <Link to="/pagina-principal">
            <button type="submit" className="login-button">Iniciar sesión</button>
          </Link>
          <Link to="/register">
            <button type="button" className="register-button">Crear cuenta</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
