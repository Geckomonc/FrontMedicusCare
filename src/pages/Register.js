import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../request/request";

import "../styles/Register.css";

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        isPatient: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await signUp(formData);
            console.log("Formulario enviado:", response);
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Registrarse</h2>
        <form className="formulario-registro" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-col">
                <label htmlFor="name">name</label>
                <input type="text" id="name" name="name" placeholder="name" onChange={handleChange} value={formData.name} />
                </div>
                <div className="form-col">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="you@example.com" onChange={handleChange} value={formData.email} />
                </div>
            </div>
            
            <div className="form-row">
                <div className="form-col">
                <label>¿Es un paciente?</label>
                <select name="isPatient" onChange={handleChange} value={formData.isPatient} required>
                    <option value="">Selecciona Si o No</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                </div>
                <div className="form-col">
                <label htmlFor="phoneNumber">Número de phoneNumber</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="1234567890" onChange={handleChange} value={formData.phoneNumber} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-col">
                <label htmlFor="dateOfBirth">Año de dateOfBirth</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" placeholder="1990" onChange={handleChange} value={formData.dateOfBirth} />
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
            
            <Link to="/login"><button type="button" className="login-button">Iniciar sesión</button></Link>
            <button type="submit" className="register-button">Crear cuenta</button>
        </form>
      </div>
    </div>
  )
}

export default Register