import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import "../styles/Notificaciones.css";
import { getRegisterMedications, getNewAlert, sendEmailNotification } from "../request/request";


function Notificaciones() {
  // --- Estados ---
  const [showForm4, setShowForm4] = useState(false); // Mostrar/Ocultar formulario
  const [notifications, setNotifications] = useState([]); // Lista de notificaciones
  const [newNotification, setNewNotification] = useState({ message: '', date: '', time: '',type_alert: ''}); // Notificación nueva
  const [activeNotification, setActiveNotification] = useState(null); // Notificación activa
  const [registerMedications, setRegisterMedications] = useState([]);
  const [selectedMedicationID, setSelectedMedicationID] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [typeAlert, setTypeAlert] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);

  
  const [newAlert, setNewAlert] = useState({
          type_of_alert: "",
      });
  // --- Manejo de eventos ---
  const handleAddNotification = () => {
    setShowForm4(!showForm4); // Alternar visibilidad del formulario
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({ ...prev, [name]: value })); // Actualizar estado de la notificación nueva
  };

   // Cargar medicamentos al montar el componente
  useEffect(() => {
      async function fetchMedications() {
          try {
            const data = await getRegisterMedications();
            console.log("Medications fetched:", data);
            setRegisterMedications(data);
          } catch (error) {
            console.error("Error al cargar los medicamentos:", error);
          }
        }
        fetchMedications();
  }, []);

  // Cargar medicamentos al montar el componente
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await getNewAlert();
        setTypeAlert(data);  // Actualiza correctamente los tipos de alerta
      } catch (error) {
        console.error("Error al cargar los tipos de alerta:", error);
      }
    }
    fetchNotifications();
  }, []);
  
  const handleAlertChange = (e) => {
    const { name, value } = e.target;
    setNewAlert({ ...newAlert, [name]: value });
    setSelectedID(value);
  };
  const handleRegisterMedication = (e) => {
    const selectedID = e.target.value;
    setSelectedMedicationID(selectedID);
    
    // Buscar el medicamento seleccionado
    const selectedMed = registerMedications.find(med => med.id_records === selectedID);
    setSelectedMedication(selectedMed || null);
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  const dateTime = new Date(`${newNotification.date}T${newNotification.time}`);
  
  if (dateTime > new Date()) {
      // Crear el objeto de datos para el backend
      const notificationData = {
          id_type_alert: selectedID,
          date: newNotification.date,
          time: newNotification.time,
          id_medication_record: selectedMedicationID,
      };
      
      try {
          // Enviar la notificación al backend
          await sendEmailNotification(notificationData);
          alert("Notificación enviada por correo con éxito.");
          
          // Agregarla también localmente a la lista de notificaciones
          setNotifications((prev) => [...prev, { ...newNotification, dateTime }]);
          setShowForm4(false); // Cerrar formulario
          setNewNotification({ message: '', date: '', time: '' }); // Reiniciar formulario
      } catch (error) {
          alert("Hubo un problema al enviar la notificación.");
          console.error(error);
      }
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
          </div>
        </header>

        {/* Contenido principal */}
        <div className='content-notifications'>
          {/* Formulario para agregar notificación */}
          {showForm4 && (
            <form className="form-notificacion" onSubmit={handleFormSubmit}>
              <label> Registro del medicamento:</label>
              <select value={selectedMedicationID} onChange={handleRegisterMedication} required>
                                    <option value="">Seleccionar...</option>
                                    {registerMedications.map((med) => (
                                        <option key={med.id_record} value={med.id_record}>
                                            {med.id_medication} (ID: {med.id_record})
                                        </option>
                                    ))}
              </select>
              <label> Tipo de alerta:</label>
              <select name="type_of_alert" value={newAlert.type_of_alert} onChange={handleAlertChange} required>
                  <option value="">Seleccionar...</option>
                  {typeAlert.map((type) => (
                    <option key={type.id_type_alert} value={type.id_type_alert}>
                        {type.alert_text} (Importancia: {type.relevance})(ID: {type.id_type_alert}) 
                    </option>
                      ))}
              </select>
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
