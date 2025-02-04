import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import "../styles/Medicamentos.css";
import { getMedications, addRegisterMedication, getRegisterMedications, getRegisterMedicationById , updateRegisterMedication, deleteRegisterMedication} from "../request/request";


function RegistrarMedicamentos() {
    const [showForm3, setShowForm3] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [deleteMedications, setDeleteShowMedications] = useState(false);
    const [showRegisterMedications, setShowRegisterMedications] = useState(false);
    const [selectedMedicationID, setSelectedMedicationID] = useState('');
    const [registerMedication, setRegisterMedication] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [searchID, setSearchID] = useState("");
    const [medications, setMedications] = useState(registerTest);
    const [newAlert, setNewAlert] = useState([]);


    const handleAddMedication = () => {
        setShowForm3(!showForm3); // Alternar la visibilidad del formulario
    };

    // Cargar medicamentos al montar el componente
    useEffect(() => {
        async function fetchMedications() {
            try {
                const data = await getMedications();
                setMedications(data);
            } catch (error) {
                console.error("Error al cargar los medicamentos:", error);
            }
        }
        fetchMedications();
    }, []);

    const handleSubmitRegistrarMed = async (e) => {
        e.preventDefault();
    
        // Capturar los valores del formulario
        const newMedication = {
            id_record: selectedMedicationID,
            status: e.target.estado.value,
            amount: e.target.cantidad.value,
            last_time: e.target.fechaActual.value,
            expiration_date: e.target.fechaVencimiento.value,
            lot_number: e.target.codigoLote.value,
            comments: e.target.comentarios.value,
        };
        console.log("Datos a enviar:", newMedication); 

        try {
            // Llamada al endpoint de registro de medicamentos
            await addRegisterMedication(newMedication);
            alert("Medicamento registrado con éxito");
    
            // Limpiar formulario
            setSelectedMedicationID('');
            e.target.reset(); // Resetear los valores del formulario
            setShowForm3(false);

        } catch (error) {
            console.error("Error al registrar el medicamento:", error);
            alert("Hubo un error al registrar el medicamento.");
        }
    };
  

    const handleSelectMedication = (e) => {
        const selectedID = e.target.value;
        setSelectedMedicationID(selectedID);
        
        // Buscar el medicamento seleccionado
        const medication = medications.find(med => med.id === selectedID);
        setSelectedMedication(medication || null);
    };

    const handleEditMedication = () => {
        setShowForm2(!showForm2);
    };


    const handleShowRegisterMedications = async () => {
        if (!showRegisterMedications) {
            try {
                const medData = await getRegisterMedications(); // Llamada al request para obtener medicamentos
                console.log(medData);
                setRegisterMedication(medData); // Guardar los medicamentos en el estado
            } catch (error) {
                console.error("Error al cargar los medicamentos:", error);
            }
        }
        setShowRegisterMedications(!showRegisterMedications); // Alternar visibilidad
    };

    
    const handleDeleteMedications = async () => {
        setDeleteShowMedications(!deleteMedications);
    };

    const handleSearchMedication = async (id) => {
        try {
                    const response = await getRegisterMedicationById(id);
                    if (response && response.length > 0) {
                        setSelectedMedication(response[0]);  // Asignar el primer elemento del array
                    } else {
                        setSelectedMedication(null);  // Limpiar la selección si no se encuentra el medicamento
                        alert("No se encontró el medicamento con el ID proporcionado.");
                    }
                } catch (error) {
                    console.error("Error al buscar el medicamento:", error);
                    alert("Hubo un problema al buscar el medicamento.");
                }
    };

    const handleSaveMedication = async () => {
        if (selectedMedication) {
                    try {
                        const updatedData = {
                            id_record: selectedMedication.id_record,
                            status: selectedMedication.status,
                            amount: selectedMedication.amount,
                            last_time: selectedMedication.last_time,
                            expiration_date: selectedMedication.expiration_date,
                            lot_number: selectedMedication.lot_number,
                            comments: selectedMedication.comments,
                        };
                        console.log("Datos actualizados a enviar:", updatedData); 
                        await updateRegisterMedication(selectedMedication.id_medication, updatedData);
                        alert("Medicamento actualizado con éxito.");
            
                        // Resetea la selección
                        setSelectedMedication(null);
                        setShowForm2(false);
                    } catch (error) {
                        console.error("Error al guardar el medicamento:", error);
                        alert("Hubo un problema al actualizar el medicamento.");
                    }
        }
    };

    const handleCancelEdit = () => {
        setSelectedMedication(null);
        setShowForm2(false);
    };

    //Fin funcionalidad medicamentos registrados

    //Inicio funcionalidad borrar registro medicamento
    const handleDeleteMedication = async () => {
        if (selectedMedication && selectedMedication.id_record) {
                    try {
                        await deleteRegisterMedication(selectedMedication.id_record);  // Llamar al backend
                        alert("Registro de medicamento eliminado con éxito.");
            
                        // Actualiza la lista de recomendaciones en el estado local
                        setMedications(medications.filter((rec) => rec.id_record !== selectedMedication.id_record));
                        setSelectedMedication(null);
                        setSearchID("");
                    } catch (error) {
                        console.error("Error al eliminar el registro:", error);
                        alert("Hubo un problema al eliminar el registro.");
                    }
                } else {
                    alert("Por favor, busca y selecciona una recomendación válida antes de eliminar.");
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
                    <form className="medication-form" onSubmit={handleSubmitRegistrarMed}>
                        <div>
                            <div>
                                <label>Seleccionar Medicamento:</label>
                                <select value={selectedMedicationID} onChange={handleSelectMedication} required>
                                    <option value="">Seleccionar...</option>
                                    {medications.map((med) => (
                                        <option key={med.id_medication} value={med.id_medication}>
                                            {med.name} (ID: {med.id_medication})
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                    {registerMedication.map((reg, index) => (
                                        <tr key={index}>
                                            <td>{reg.id_record}</td>
                                            <td>{reg.id_medication}</td>
                                            <td>{reg.last_time}</td>
                                            <td>{reg.expiration_date}</td>
                                            <td>{reg.status ? "Activo" : "Inactivo"}</td>
                                            <td>{reg.lot_number}</td>
                                            <td>{reg.amount}</td>
                                            <td>{reg.comments}</td>
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
                                <label>ID del Medicamento:</label>
                                <input
                                    type="text"
                                    value={searchID}
                                    onChange={(e) => setSearchID(e.target.value)}  // Solo guarda el valor
                                    placeholder="Ingrese ID"
                                />
                            </div>
                            {selectedMedication && (
                                <div>
                                    <label>Medicamento:</label>
                                    <p>
                                        {medications.find((med) => med.id_medication === selectedMedication.id_medication)?.name}
                                        {' '} {selectedMedication.id_medication}
                                    </p>
                                    <label>Fecha de Registro:</label>
                                    <input
                                        type="date"
                                        value={selectedMedication.last_time}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                last_time: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Fecha de Vencimiento:</label>
                                    <input
                                        type="date"
                                        value={selectedMedication.expiration_date}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                expiration_date: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Estado:</label>
                                    <select
                                        value={selectedMedication.status}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                    <label>Código de Lote:</label>
                                    <input
                                        type="text"
                                        value={selectedMedication.lot_number}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                lot_number: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Cantidad:</label>
                                    <input
                                        type="text"
                                        value={selectedMedication.amount}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                amount: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Comentarios:</label>
                                    <textarea
                                        value={selectedMedication.comments}
                                        onChange={(e) =>
                                            setSelectedMedication({
                                                ...selectedMedication,
                                                comments: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            )}
                            <div className="form-actions">
                                <button type="button" onClick={() => handleSearchMedication(searchID)}>Buscar</button>
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
                            <label>ID del Registro de Medicamento a Eliminar:</label>
                            <input
                                type="text"
                                value={searchID}
                                onChange={(e) => setSearchID(e.target.value)}
                                placeholder="Ingresa el ID"
                            />
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
                                            <td>{selectedMedication.id_record}</td>
                                            <td>{selectedMedication.id_medication}</td>
                                            <td>{selectedMedication.last_time}</td>
                                            <td>{selectedMedication.expiration_date}</td>
                                            <td>{selectedMedication.status ? "Activo" : "Inactivo"}</td>
                                            <td>{selectedMedication.lot_number}</td>
                                            <td>{selectedMedication.amount}</td>
                                            <td>{selectedMedication.comments}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                        )}
                        <div className="delete-actions">
                            <button type="button" onClick={() => handleSearchMedication(searchID)}>Buscar</button>
                            <button onClick={handleDeleteMedication}>Eliminar</button>
                            <button onClick={handleCancelDelete}>Cancelar</button>
                        </div>
                        {!selectedMedication && searchID && (
                            <p>No se encontró un registro de medicamento con el ID proporcionado.</p>
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