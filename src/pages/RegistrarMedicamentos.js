import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import "../styles/Medicamentos.css";

function RegistrarMedicamentos() {
    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    //const [medications, setMedications] = useState([]);
    const [showMedications, setShowMedications] = useState(false);

    const [showRegisterMedications, setShowRegisterMedications] = useState(false);

    const handleAddMedication = () => {
        setShowForm(!showForm); // Alternar la visibilidad del formulario
    };

    const handleRegisterMedication = () => {
        setShowForm2(!showForm2);
    };

    const handleShowMedications = async () => {
        setShowMedications(!showMedications);
        /*
        if (!showMedications) {
            try {
                const response = await fetch('https://api.example.com/medications');
                const data = await response.json();
                setMedications(data);
            } catch (error) {
                console.error("Error al cargar los medicamentos:", error);
            }
        }*/
    };

    const handleShowRegisterMedications = async () => {
        setShowRegisterMedications(!showRegisterMedications);
        /*
        if (!showMedications) {
            try {
                const response = await fetch('https://api.example.com/medications');
                const data = await response.json();
                setMedications(data);
            } catch (error) {
                console.error("Error al cargar los medicamentos:", error);
            }
        }*/
    };

  return (
    <div className='medicamentos'>
        <Sidebar />
        <div className='content-med'>
            <header className='header-med'>
                <h1>Registrar Medicación</h1>
                <div className='button-option'>
                    <button onClick={handleAddMedication}>Registrar Medicación</button>
                    <button onClick={handleShowRegisterMedications}>Mostrar Medicación</button>
                    <button onClick={handleRegisterMedication}>Editar Medicación</button>
                    <button onClick={handleShowMedications}>Borrar Medicación</button>
                </div>
            </header>
            {showForm && (
                <div className='content-add'>
                
                    <form className="medication-form">
                        <div>
                            <label>Medicamento:</label>
                            <select name="medicamento" required>
                                <option value="">Selecciona el medicamento</option> {/* Opción por defecto */}
                                <option value="">Ibuprofeno</option>
                                <option value="">Acetaminofén</option>
                                <option value="">Nitrofurantoina</option>
                            </select>
                            <label>Estado:</label>
                            <select name="estado" required>
                                <option value="">Selecciona un estado</option> {/* Opción por defecto */}
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                            
                        </div>
                        <div>
                            <label>Fecha Actual:</label>
                            <input type="date" name="fechaActual" required />
                            <label>Código de lote:</label>
                            <input type="text" name="codigoLote" required />
                        </div>
                        <div>
                            <label>Fecha de Vencimiento:</label>
                            <input type="date" name="fechaVencimiento" required />
                            <label>Comentarios:</label>
                            <textarea name="comentarios" required></textarea>
                        </div>
                        <button type="submit">Guardar Registro</button>
                    </form>
                </div>
            )}
            <div className='content-table2'>
                {showRegisterMedications && (
                    <div className='medication-table2'>
                        <table>
                                <thead>
                                    <tr>
                                        <th>Medicamento</th>
                                        <th>Fecha Registro</th>
                                        <th>Fecha Vencimiento</th>
                                        <th>Estado</th>
                                        <th>Código de lote</th>
                                        <th>Comentarios</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registerTest.map((reg, index) => (
                                        <tr key={index}>
                                            <td>{reg.medicamento}</td>
                                            <td>{reg.fecha_registro}</td>
                                            <td>{reg.fecha_vencimiento}</td>
                                            <td>{reg.estado}</td>
                                            <td>{reg.codigo_lote}</td>
                                            <td>{reg.comentarios}</td>
                                        </tr>
                                    ))}
                                </tbody>
                        </table>  
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default RegistrarMedicamentos;

const registerTest = [
    {
    "medicamento": "Acetaminofen",
    "fecha_registro": "4/11/2024",
    "fecha_vencimiento": "4/11/2027",
    "estado": "activo",
    "codigo_lote": "SD345",
    "comentarios": "No tomar después de tomar acetopan"
    },
    {
    "medicamento": "Ibuprofeno",
    "fecha_registro": "13/10/2024",
    "fecha_vencimiento": "25/07/2027",
    "estado": "activo",
    "codigo_lote": "SDF6987",
    "comentarios": "No tomar después de tomar acetopan"
    }
]