import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import "../styles/Notificaciones.css";

function Notificaciones() {
  // --- Estados ---
  const [showForm4, setShowForm4] = useState(false); // Mostrar/Ocultar formulario
  const [notifications, setNotifications] = useState([]); // Lista de notificaciones
  const [newNotification, setNewNotification] = useState({ message: '', date: '', time: '',registromedicamento: ''}); // Notificación nueva
  const [activeNotification, setActiveNotification] = useState(null); // Notificación activa

  // --- Manejo de eventos ---
  const handleAddNotification = () => {
    setShowForm4(!showForm4); // Alternar visibilidad del formulario
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({ ...prev, [name]: value })); // Actualizar estado de la notificación nueva
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dateTime = new Date(`${newNotification.date}T${newNotification.time}`);
    if (dateTime > new Date()) {
      // Agregar nueva notificación a la lista
      setNotifications((prev) => [...prev, { ...newNotification, dateTime }]);
      setShowForm4(false); // Cerrar formulario
      setNewNotification({ message: '', date: '', time: '' }); // Reiniciar formulario
    } else {
      alert('Por favor selecciona una fecha y hora futura.');
    }
  };

  const handleNotificationAction = (action) => {
    if (action === 'done') {
      alert('Notificación marcada como hecha');
    } else {
      alert('Notificación marcada como no hecha');
    }
    setActiveNotification(null); // Limpiar notificación activa
  };

  // --- Efectos ---
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        const now = new Date();
        const nextNotification = notifications.find((n) => n.dateTime <= now);
        if (nextNotification) {
          setActiveNotification(nextNotification); // Mostrar notificación activa
          setNotifications((prev) =>
            prev.filter((n) => n.dateTime !== nextNotification.dateTime)
          ); // Remover notificación mostrada
        }
      }, 1000); // Revisar cada segundo

      return () => clearTimeout(timer); // Limpiar temporizador
    }
  }, [notifications]);

  // --- Renderizado ---
  return (
    <div className='notificaciones'>
      <Sidebar />
      <div className='content-med'>
        {/* Encabezado */}
        <header className='header-med'>
          <h1>Notificaciones</h1>
          <div className='button-option'>
            <button onClick={handleAddNotification}>Agregar notificación</button>
            <button>Mostrar notificación</button>
            <button>Editar notificación</button>
            <button>Borrar notificación</button>
          </div>
        </header>

        {/* Contenido principal */}
        <div className='content-notifications'>
          {/* Formulario para agregar notificación */}
          {showForm4 && (
            <form className="form-notificacion" onSubmit={handleFormSubmit}>
              <label>
                Medicamento:
                <select
                  name="registromedicamento"
                  value={newNotification.registromedicamento || ''} // Valor actual del estado
                  onChange={handleInputChange} // Manejar cambios
                  required
                >
                  <option value="">Seleccione un registro</option> {/* Opción por defecto */}
                  <option value="1">Medicamento 1</option>
                  <option value="2">Medicamento 2</option>
                  <option value="3">Medicamento 3</option>
                </select>
              </label>
              <label>
                Mensaje:
                <input
                  type="text"
                  name="message"
                  value={newNotification.message}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Fecha:
                <input
                  type="date"
                  name="date"
                  value={newNotification.date}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Hora:
                <input
                  type="time"
                  name="time"
                  value={newNotification.time}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Enviar</button>
            </form>
          )}
          {/* Notificación emergente */}
          {activeNotification && (
            <div className="notification-popup">
              <p>{activeNotification.message}</p>
              <button onClick={() => handleNotificationAction('done')}>Hecho</button>
              <button onClick={() => handleNotificationAction('not-done')}>No Hecho</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notificaciones;
