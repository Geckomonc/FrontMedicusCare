import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import "../styles/Medicamentos.css";

function RegistrarMedicamentos() {
    const [showForm3, setShowForm3] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [deleteMedications, setDeleteShowMedications] = useState(false);
    const [showRegisterMedications, setShowRegisterMedications] = useState(false);

    const [selectedMedication, setSelectedMedication] = useState(null);
    const [searchID, setSearchID] = useState("");
    const [medications, setMedications] = useState(registerTest);

    const handleAddMedication = () => {
        setShowForm3(!showForm3); // Alternar la visibilidad del formulario
    };

    const handleEditMedication = () => {
        setShowForm2(!showForm2);
    };

    const handleSearchMedication2 = () => {
        const medication = medications.find((med) => med.id === searchID);
        setSelectedMedication(medication || null);
    };

    const handleDeleteMedications = async () => {
        setDeleteShowMedications(!deleteMedications);
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
    //Funcionalidad editar medicamentos registrados

    const handleSearchMedication = (id) => {
        // Buscar el medicamento por ID
        const medication = registerTest.find((med) => med.id === id);
        if (medication) {
            setSelectedMedication(medication);
        } else {
            setSelectedMedication(null); // Si no se encuentra, limpiar selección
        }
    };

    const handleSaveMedication = () => {
        if (selectedMedication) {
            console.log("Medicamento actualizado:", selectedMedication);
            setSelectedMedication(null);
            setShowForm2(false);
        }
    };

    const handleCancelEdit = () => {
        setSelectedMedication(null);
        setShowForm2(false);
    };

    //Fin funcionalidad medicamentos registrados

    //Inicio funcionalidad borrar registro medicamento
    const handleDeleteMedication = () => {
        if (selectedMedication) {
            setMedications(medications.filter((med) => med.id !== selectedMedication.id));
            setSelectedMedication(null);
            setSearchID("");
        }
    };

    const handleCancelDelete = () => {
        setSelectedMedication(null);
        setSearchID("");
    };

    //Fin funcionalidad borrar registro medicamento

  return (
    <div className='medicamentos'>
        <Sidebar />
        <div className='content-med'>
            <header className='header-med'>
                <h1>Registrar Medicación</h1>
                <div className='button-option'>
                    <button onClick={handleAddMedication}>Registrar Medicación</button>
                    <button onClick={handleShowRegisterMedications}>Mostrar Medicación</button>
                    <button onClick={handleEditMedication}>Editar Medicación</button>
                    <button onClick={handleDeleteMedications}>Borrar Medicación</button>
                </div>
            </header>
            {showForm3 && (
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
                            <label>Cantidad:</label>
                            <input type="text" name="cantidad" required />
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
                                        <th>ID</th>
                                        <th>Medicamento</th>
                                        <th>Fecha Registro</th>
                                        <th>Fecha Vencimiento</th>
                                        <th>Estado</th>
                                        <th>Código de lote</th>
                                        <th>Cantidad</th>
                                        <th>Comentarios</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registerTest.map((reg, index) => (
                                        <tr key={index}>
                                            <td>{reg.id}</td>
                                            <td>{reg.medicamento}</td>
                                            <td>{reg.fecha_registro}</td>
                                            <td>{reg.fecha_vencimiento}</td>
                                            <td>{reg.estado}</td>
                                            <td>{reg.codigo_lote}</td>
                                            <td>{reg.cantidad}</td>
                                            <td>{reg.comentarios}</td>
                                        </tr>
                                    ))}
                                </tbody>
                        </table>  
                    </div>
                )}
            </div>
            <div className='content-edit'>
                {showForm2 && (
                    <div className='content-add'>
                        <form className="medication-form">
                            <div>
                                <label>ID Medicamento:</label>
                                <input
                                    type="text"
                                    placeholder="Buscar por ID"
                                    onChange={(e) => handleSearchMedication(e.target.value)}
                                />
                            </div>
                            {selectedMedication && (
                                <div>
                                    <label>Medicamento:</label>
                                    <input
                                        type="text"
                                        value={selectedMedication.medicamento}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                medicamento: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Fecha de Registro:</label>
                                    <input
                                        type="date"
                                        value={selectedMedication.fecha_registro}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                fecha_registro: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Fecha de Vencimiento:</label>
                                    <input
                                        type="date"
                                        value={selectedMedication.fecha_vencimiento}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                fecha_vencimiento: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Estado:</label>
                                    <select
                                        value={selectedMedication.estado}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                estado: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                    <label>Código de Lote:</label>
                                    <input
                                        type="text"
                                        value={selectedMedication.codigo_lote}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                codigo_lote: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Cantidad:</label>
                                    <input
                                        type="text"
                                        value={selectedMedication.cantidad}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                cantidad: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Comentarios:</label>
                                    <textarea
                                        value={selectedMedication.comentarios}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                comentarios: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            )}
                            <div className="form-actions">
                                <button type="button" onClick={handleSaveMedication}>
                                    Guardar
                                </button>
                                <button type="button" onClick={handleCancelEdit}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className='content-table2'>
                {deleteMedications && (
                    <div className='content-delete'>
                        <div>
                            <label>ID del Medicamento a Eliminar:</label>
                            <input
                                type="text"
                                value={searchID}
                                onChange={(e) => setSearchID(e.target.value)}
                                placeholder="Ingresa el ID"
                            />
                            <button onClick={handleSearchMedication2}>Buscar</button>
                        </div>
                        {selectedMedication && (
                            <div className="delete-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Medicamento</th>
                                            <th>Fecha Registro</th>
                                            <th>Fecha Vencimiento</th>
                                            <th>Estado</th>
                                            <th>Código de lote</th>
                                            <th>Cantidad</th>
                                            <th>Comentarios</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{selectedMedication.id}</td>
                                            <td>{selectedMedication.medicamento}</td>
                                            <td>{selectedMedication.fecha_registro}</td>
                                            <td>{selectedMedication.fecha_vencimiento}</td>
                                            <td>{selectedMedication.estado}</td>
                                            <td>{selectedMedication.codigo_lote}</td>
                                            <td>{selectedMedication.cantidad}</td>
                                            <td>{selectedMedication.comentarios}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="delete-actions">
                                    <button onClick={handleDeleteMedication}>Eliminar</button>
                                    <button onClick={handleCancelDelete}>Cancelar</button>
                                </div>
                            </div>
                        )}
                        {!selectedMedication && searchID && (
                            <p>No se encontró un medicamento con el ID proporcionado.</p>
                        )}
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
    "id": "1",
    "medicamento": "Acetaminofen",
    "fecha_registro": "4/11/2024",
    "fecha_vencimiento": "4/11/2027",
    "estado": "activo",
    "codigo_lote": "SD345",
    "cantidad": "30",
    "comentarios": "No tomar después de tomar acetopan"
    },
    {
    "id": "2",
    "medicamento": "Ibuprofeno",
    "fecha_registro": "13/10/2024",
    "fecha_vencimiento": "25/07/2027",
    "estado": "activo",
    "codigo_lote": "SDF6987",
    "cantidad": "13",
    "comentarios": "No tomar después de tomar acetopan"
    }
]