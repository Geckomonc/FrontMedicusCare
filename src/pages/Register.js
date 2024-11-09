import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        nombre: '',
        esPaciente: '',
        celular: '',
        password: '',
        confirmPassword: '',
        nacimiento: '',
      });
    
      const [errors, setErrors] = useState({
        passwordMismatch: false,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        if (name === 'confirmPassword') {
          setErrors({
            ...errors,
            passwordMismatch: formData.password !== value,
          });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
          alert("Las contraseñas no coinciden");
          return;
        }
        // Aquí puedes manejar el envío del formulario
        console.log("Formulario enviado:", formData);
      };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Registrarse</h2>
        <form className="formulario-registro">
            <div className="form-row">
                <div className="form-col">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" placeholder="Nombre" onChange={handleChange} value={formData.nombre} />
                </div>
                <div className="form-col">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="you@example.com" onChange={handleChange} value={formData.email} />
                </div>
            </div>
            
            <div className="form-row">
                <div className="form-col">
                <label>¿Es un paciente?</label>
                <select name="pacienteTipo" required>
                    <option value="">Selecciona Si o No</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                </div>
                <div className="form-col">
                <label htmlFor="celular">Número de celular</label>
                <input type="tel" id="celular" name="celular" placeholder="1234567890" onChange={handleChange} value={formData.celular} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-col">
                <label htmlFor="nacimiento">Año de Nacimiento</label>
                <input type="number" id="nacimiento" name="nacimiento" placeholder="1990" onChange={handleChange} value={formData.nacimiento} />
                </div>
                <div className="form-col">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="********" onChange={handleChange} value={formData.password} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-col">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="********" onChange={handleChange} value={formData.confirmPassword} />
                {errors.passwordMismatch && <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>}
                </div>
            </div>
            
            <Link to="/login"><button type="submit" className="login-button">Iniciar sesión</button></Link>
            <button type="button" className="register-button">Crear cuenta</button>
        </form>
      </div>
    </div>
  )
}

export default Register