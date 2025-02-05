import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { addMedication } from "../request/request";
import { getMedications } from "../request/request";
import { getMedicationById } from "../request/request";
import { updateMedication } from "../request/request";
import { deleteMedication, getDrugTypes} from "../request/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Medicamentos.css";

function Medicamentos() {
    const [newMedication, setNewMedication] = useState({
        name: "",
        notes: "",
        type_of_drug: "",
        contradictions: "",
    });
    
    const handleMedicationChange = (e) => {
        const { name, value } = e.target;
        setNewMedication({ ...newMedication, [name]: value });
    };
    const notifySuccess = (message) => toast.success(`${message}`);

    useEffect(() => {
        // Obtener los tipos de droga cuando se monta el componente
        async function fetchDrugTypes() {
            try {
                const types = await getDrugTypes();
                console.log(types);
                setTypeMed(types);  // Guardar los tipos de droga en el estado
            } catch (error) {
                console.error("Error al obtener los tipos de droga:", error);
            }
        }
        fetchDrugTypes();
    }, []);

    const handleAddMedicationSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addMedication(newMedication);
            notifySuccess("Medicamento agregado con éxito"); 
            console.log("Respuesta del servidor:", response);
            // Limpia el formulario después de agregar
            setNewMedication({
                name: "",
                notes: "",
                type_of_drug: "",
                contradictions: "",
            });
            setShowForm2(false); // Cierra el formulario
        } catch (error) {
            console.error("Error al agregar el medicamento:", error);
            alert("Hubo un problema al agregar el medicamento.");
        }
    };
    
    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [showMedications, setShowMedications] = useState(false);
    const [showRegisterMedications, setShowRegisterMedications] = useState(false);
    const [selectedTypeID, setSelectedTypeID] = useState('');
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [searchID, setSearchID] = useState("");
    const [medications, setMedications] = useState([]);
    const [typeMed, setTypeMed] = useState([]);

    const handleAddMedication = () => {
        setShowForm(!showForm); // Alternar la visibilidad del formulario
    };

    const handleRegisterMedication = () => {
        setShowForm2(!showForm2);
    };

    const handleSelectType = (e) => {
        const selectedID = e.target.value;
        setSelectedTypeID(selectedID);
        
        // Buscar el medicamento seleccionado
        const selectedType = typeMed.find(med => med.id === selectedID);
        setSelectedMedication(selectedType || null);
    };

    const handleShowMedications = async () => {
        if (!showMedications) { // Solo carga los medicamentos si no se han mostrado
            try {
                const data = await getMedications();
                setMedications(data); // Guardar los medicamentos en el estado
            } catch (error) {
                console.error("Error al cargar los medicamentos:", error);
            }
        }
        setShowMedications(!showMedications); // Alternar visibilidad
    };    
    //Funcionalidad de eliminar medicamento inicio
    const handleShowRegisterMedications = () => {
        setShowRegisterMedications(!showRegisterMedications);
        setSearchID("");
        setSelectedMedication(null);
    };

    const handleDeleteMedication = async () => {
        if (selectedMedication) {
            try {
                await deleteMedication(selectedMedication.id_medication);  // Llamar al backend
                notifySuccess("Medicamento eliminado con éxito"); 
                // Actualiza la lista de medicamentos local
                setMedications(medications.filter((med) => med.id_medication !== selectedMedication.id_medication));
                setSelectedMedication(null);
                setSearchID("");
            } catch (error) {
                console.error("Error al eliminar el medicamento:", error);
                alert("Hubo un problema al eliminar el medicamento.");
            }
        }
    };    

    const handleCancelDelete = () => {
        setSelectedMedication(null);
        setSearchID("");
    };
    const handleSearchMedication = async (id) => {
        try {
            const response = await getMedicationById(id);
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
                    id_medication: selectedMedication.id_medication,
                    name: selectedMedication.name,
                    notes: selectedMedication.notes,
                    type_of_drug: selectedMedication.type_of_drug,
                    contradictions: selectedMedication.contradictions,
                };
                notifySuccess("Medicamento actualizado con éxito"); 
                console.log("Datos actualizados a enviar:", updatedData); 
                await updateMedication(selectedMedication.id_medication, updatedData);
    
                // Resetea la selección
                setSelectedMedication(null);
                setShowForm(false);
            } catch (error) {
                console.error("Error al guardar el medicamento:", error);
                alert("Hubo un problema al actualizar el medicamento.");
            }
        }
    };

    const handleCancelEdit = () => {
        setSelectedMedication(null);
        setShowForm(false);
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
                    <button onClick={handleShowRegisterMedications}>Borrar Medicamentos</button>
                </div>
            </header>
            {showForm2 && (
                <div className='content-register'>                
                    <form className="medication-register" onSubmit={handleAddMedicationSubmit}>
                        <div>
                            <label>Nombre:</label>
                            <input type="text" name="name" value={newMedication.name} onChange={handleMedicationChange} required />
                            <label>Notas</label>
                            <textarea name="notes" value={newMedication.notes} onChange={handleMedicationChange} required />
                        </div>
                        <div>
                            <label>Tipo de droga:</label>
                            <select name="type_of_drug" value={newMedication.type_of_drug} onChange={handleMedicationChange} required>
                                <option value="">Seleccionar...</option>
                                {typeMed.map((type) => (
                                    <option key={type.id_type_of_drug} value={type.id_type_of_drug}>
                                        {type.type} (ID: {type.id_type_of_drug})
                                    </option>
                                ))}
                            </select>
                            <label>Contraindicaciones:</label>
                            <textarea name="contradictions" value={newMedication.contradictions} onChange={handleMedicationChange} required/>                           
                        </div>
                        <button type="submit">Guardar Medicamento</button>
                    </form>
                </div>    
            )}
            {showForm && (
                <div className='content-add'>
                    <form className="medication-edit">
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
                                    <label>Nombre:</label>
                                    <input
                                        type="text"
                                        value={selectedMedication.name}
                                        onChange={(e) =>
                                            setSelectedMedication({ ...selectedMedication, name: e.target.value })
                                        }
                                    />
                                    <label>Notas:</label>
                                    <textarea
                                        value={selectedMedication.notes}
                                        onChange={(e) =>
                                            setSelectedMedication({ ...selectedMedication, notes: e.target.value })
                                        }
                                    />
                                    
                                    <label>Tipo de Droga:</label>
                                    <select
                                        value={selectedMedication?.type_of_drug || ""}  // Usamos el valor correcto para el select
                                        onChange={(e) =>
                                            setSelectedMedication({ ...selectedMedication, type_of_drug: e.target.value })
                                        }
                                    >
                                        {typeMed.map((type) => (
                                            <option key={type.id_type_of_drug} value={type.id_type_of_drug}>
                                                {type.type} (ID: {type.id_type_of_drug})
                                            </option>
                                        ))}
                                    </select>

                                    <label>Contraindicaciones:</label>
                                    <textarea
                                        value={selectedMedication.contradictions}
                                        onChange={(e) =>
                                            setSelectedMedication({ ...selectedMedication, contradictions: e.target.value })
                                        }
                                    />
                                </div>
                        )}
                        <div className="form-actions">
                            <button type="button" onClick={() => handleSearchMedication(searchID)}>Buscar</button>
                            <button type="button" onClick={handleSaveMedication}>Guardar</button>
                            <button type="button" onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
            <div className='content-table'>
                {showMedications && (
                    <div className='medication-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Contraindicaciones</th>
                                    <th>Notas</th>
                                    <th>Tipo de Droga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medications.length > 0 ? (
                                    medications.map((med, index) => (
                                        <tr key={index}>
                                            <td>{med.id_medication}</td>
                                            <td>{med.name}</td>
                                            <td>{med.contradictions}</td>
                                            <td>{med.notes}</td>
                                            <td>{med.type_of_drug}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No hay medicamentos disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>  
                    </div>
                )}
            </div>
            <div className='content-table2'>
                {showRegisterMedications && (
                    <div className='content-delete'>
                        <div className="delete-form">
                            <label>ID del Medicamento:</label>
                            <input
                                type="text"
                                value={searchID}
                                onChange={(e) => setSearchID(e.target.value)}  // Solo guarda el valor
                                placeholder="Ingrese ID"
                            />
                            <button type="button" onClick={() => handleSearchMedication(searchID)}>Buscar</button>
                        </div>
                        {selectedMedication && (
                            <div className="delete-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Contraindicaciones</th>
                                            <th>Notas</th>
                                            <th>Tipo de Droga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{selectedMedication.id_medication}</td>
                                            <td>{selectedMedication.name}</td>
                                            <td>{selectedMedication.contradictions}</td>
                                            <td>{selectedMedication.notes}</td>
                                            <td>{selectedMedication.type_of_drug}</td>
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
        <ToastContainer />
    </div>
  )
}

export default Medicamentos;

