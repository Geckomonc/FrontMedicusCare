import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import "../styles/Medicamentos.css";

function Medicamentos() {
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
                <h1>Medicamentos</h1>
                <div className='button-option'>
                    <button onClick={handleRegisterMedication}>Agregar medicamento</button>
                    <button onClick={handleShowMedications}>Mostrar Medicamento</button>
                    <button onClick={handleAddMedication}>Editar Medicamentos</button>
                    <button onClick={handleShowRegisterMedications}>Borrar Medicametos</button>
                </div>
            </header>
            {showForm2 && (
                <div className='content-register'>                
                    <form className="medication-register">
                        <div>
                            <label>Nombre:</label>
                            <input type="text" name="nombre" required />
                            <label>Notas</label>
                            <textarea name="recomendaciones" required></textarea>
                        </div>
                        <div>
                            <label>Tipo de droga:</label>
                            <select name="tipoDroga" required>
                                <option value="">Selecciona el tipo</option>
                                <option value="">Pastilla</option>
                                <option value="">Jeringa</option>
                                <option value="">Jarabe</option>
                            </select>
                            <label>Contraindicaciones:</label>
                            <textarea name="contraindicaciones" required></textarea>                            
                        </div>
                        <button type="submit">Guardar Medicamento</button>
                    </form>
                </div>    
            )}
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
            <div className='content-table'>
                {showMedications && (
                    <div className='medication-table'>
                        <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Contraindicaciones</th>
                                        <th>Notas</th>
                                        <th>Tipo de Droga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicationsTest.map((med, index) => (
                                        <tr key={index}>
                                            <td>{med.name}</td>
                                            <td>{med.contradictions}</td>
                                            <td>{med.notes}</td>
                                            <td>{med.id_type_of_drug}</td>
                                        </tr>
                                    ))}
                                </tbody>
                        </table>  
                    </div>
                )}
            </div>
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

export default Medicamentos;

const medicationsTest = [
    {
    "name": "Acetaminofen",
    "contradictions": "Dolor de pecho",
    "notes": "Tomarse cada 6 horas minimo",
    "id_type_of_drug": "pastilla"
    },
    {
    "name": "Ibuprofeno",
    "contradictions": "cancér de pulmón",
    "notes": "ojo con la taquicardia",
    "id_type_of_drug": "pastilla"
    }
]

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