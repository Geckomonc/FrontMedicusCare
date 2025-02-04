import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import "../styles/Recomendaciones.css";
import { addRecommendation, getMedications, getRecommendations, getRecommendationById, updateRecommendation, deleteRecommendation } from "../request/request"; // Importar funciones del backend




function Recomendaciones() {
    //Añadir Recomedación
    const [showForm, setShowForm] = useState(false);
    const [selectedMedicationID, setSelectedMedicationID] = useState('');
    const [selectedRecommendation, setSelectedRecommendation] = useState({});

    const handleAddRecomendaciones = () => {
        setShowForm(!showForm); // Alternar la visibilidad del formulario
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

    //Mostrar Recomendación
    const [showRegisterRecomendaciones, setShowRecomendaciones] = useState(false);
    
    //Editar Recomendación
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [searchID, setSearchID] = useState("");
    const [medications, setMedications] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [note, setNote] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    



    const [showForm2, setShowForm2] = useState(false);
    const handleEditRecomendaciones = () => {
        setShowForm2(!showForm2);
    };

    const handleCancelEdit = () => {
        setSelectedMedication(null);
        setShowForm2(false);
    };

    //Eliminar Recomendación
    
    const [showRegisterMedications, setShowRegisterMedications] = useState(false);
    const handleDeleteRecomendaciones = () => {
        setShowRegisterMedications(!showRegisterMedications);
        setSearchID("");
        setSelectedMedication(null);
    };
    // Eliminar recomendación
    const handleDeleteRecommendation = async () => {
        if (selectedRecommendation && selectedRecommendation.id_recommendation) {
            try {
                await deleteRecommendation(selectedRecommendation.id_recommendation);  // Llamar al backend
                alert("Recomendación eliminada con éxito.");
    
                // Actualiza la lista de recomendaciones en el estado local
                setRecommendations(recommendations.filter((rec) => rec.id_recommendation !== selectedRecommendation.id_recommendation));
                setSelectedRecommendation(null);
                setSearchID("");
            } catch (error) {
                console.error("Error al eliminar la recomendación:", error);
                alert("Hubo un problema al eliminar la recomendación.");
            }
        } else {
            alert("Por favor, busca y selecciona una recomendación válida antes de eliminar.");
        }
    };

    const handleSelectMedication = (e) => {
        const selectedID = e.target.value;
        setSelectedMedicationID(selectedID);
        
        // Buscar el medicamento seleccionado
        const medication = medications.find(med => med.id === selectedID);
        setSelectedMedication(medication || null);
    };

    
    const handleCancelDelete = () => {
        setSelectedMedication(null);
        setSearchID("");
    };

    const handleSubmitRecommedation = async (e) => {
        e.preventDefault();

        if (selectedMedicationID && note && recommendation) {
            const recommen = {
                id_medication: selectedMedicationID,
                note,
                recommendation,
            };

            try {
                await addRecommendation(recommen);
                alert("Recomendación guardada con éxito");
                // Limpiar el formulario
                setSelectedMedicationID('');
                setNote('');
                setRecommendation('');
                setShowForm(false);

                // Actualizar las recomendaciones en la tabla
                const updatedRecommendations = await getRecommendations();
                setRecommendations(updatedRecommendations);
            } catch (error) {
                console.error("Error al guardar la recomendación:", error);
                alert("Hubo un error al guardar la recomendación");
            }
        } else {
            alert("Por favor, completa todos los campos");
        }
    };

    const handleShowRecommendations = async () => {
        if (!showRecommendations) {
            try {
                const recData = await getRecommendations();
                console.log("Recomendaciones obtenidas:", recData); 
                setRecommendations(recData); // Guardar las recomendaciones en el estado
            } catch (error) {
                console.error("Error al cargar las recomendaciones:", error);
            }
        }
        setShowRecommendations(!showRecommendations); // Alternar visibilidad
    };

    // Buscar recomendación por ID
    const handleSearchRecommendation = async (id) => {
        try {
            const response = await getRecommendationById(id);
            if (response && response.length > 0) {
                setSelectedRecommendation(response[0]);  // Asignar el primer elemento del array
            } else {
                setSelectedRecommendation(null);  // Limpiar la selección si no se encuentra el medicamento
                alert("No se encontró el medicamento con el ID proporcionado.");
            }
        } catch (error) {
            console.error("Error al buscar el medicamento:", error);
            alert("Hubo un problema al buscar el medicamento.");
        }
    };
    
    const handleSaveRecommendation = async () => {
        if (selectedRecommendation) {
                    try {
                        const updatedData = {
                            note: selectedRecommendation.note,
                            recommendation: selectedRecommendation.recommendation,
                        };
                        console.log("Datos actualizados a enviar:", updatedData); 
                        await updateRecommendation(selectedRecommendation.id_recommendation, updatedData);
                        alert("Medicamento actualizado con éxito.");
                        
                        // Actualiza el listado de medicamentos si es necesario
                        await handleShowRecommendations();
            
                        // Resetea la selección
                        setSelectedRecommendation(null);
                        setShowForm(false);
                    } catch (error) {
                        console.error("Error al guardar el medicamento:", error);
                        alert("Hubo un problema al actualizar el medicamento.");
                    }
        }
    };

    ////////////////////////////////////////
    return (
        <div className='recomendaciones'>
            <Sidebar />
            <div className='content-med'>
                <header className='header-med'>
                        <h1>Recomendaciones</h1>
                        <div className='button-option'>
                            <button onClick={handleAddRecomendaciones}>Agregar recomendación</button>
                            <button onClick={handleShowRecommendations}>Mostrar recomendaciones</button>
                            <button onClick={handleEditRecomendaciones}>Editar recomendaciones</button>
                            <button onClick={handleDeleteRecomendaciones}>Borrar recomendaciones</button>
                        </div>
                </header>
                {showForm && (    
                    <div className='content-recomendation'>                
                        <form className="medication-recomendation" onSubmit={handleSubmitRecommedation}>
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

                            <div>
                                <label>Notas: </label>
                                <textarea
                                    name="notas"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label>Condiciones: </label>
                                <textarea
                                    name="condiciones"
                                    value={recommendation}
                                    onChange={(e) => setRecommendation(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit">Guardar Recomendación</button>
                        </form>
                    </div>    
                )}
                <div className='content-table'>
                    {showRecommendations && (
                        <div className='recomendation-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Medicamento</th>
                                        <th>Notas</th>
                                        <th>Condiciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recommendations.map((rec, index) => (
                                        <tr key={index}>
                                            <td>{rec.id_recommendation}</td>
                                            <td>{rec.id_medication}</td>
                                            <td>{rec.note}</td>
                                            <td>{rec.recommendation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {showForm2 && (
                    <div className='content-add'>
                        <form className="recommendation-edit">
                            <div>
                                <label>ID de la Recomendación:</label>
                                    <input
                                        type="text"
                                        value={searchID}
                                        onChange={(e) => setSearchID(e.target.value)}
                                        placeholder="Ingrese ID"
                                    />
                            </div>
                            {selectedRecommendation && (
                                <div>
                                    <label>Medicamento:</label>
                                    <p>
                                        {medications.find((med) => med.id_medication === selectedRecommendation.id_medication)?.name}
                                        {' '} {selectedRecommendation.id_medication}
                                    </p>
                                    <label>Notas:</label>
                                    <textarea
                                        value={selectedRecommendation.note}
                                        onChange={(e) =>
                                            setSelectedRecommendation({
                                                ...selectedRecommendation,
                                                note: e.target.value,
                                            })
                                        }
                                    />

                                    <label>Condiciones:</label>
                                    <textarea
                                        value={selectedRecommendation.recommendation}
                                        onChange={(e) =>
                                            setSelectedRecommendation({
                                                ...selectedRecommendation,
                                                recommendation: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            )}

                            <div className="form-actions">
                                <button type="button" onClick={() => handleSearchRecommendation(searchID)}>
                                    Buscar
                                </button>
                                <button type="button" onClick={handleSaveRecommendation}>
                                    Guardar
                                </button>
                                <button type="button" onClick={handleCancelEdit}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                <div className='content-table2'>
                    {showRegisterMedications && (
                            <div className='content-delete'>
                                <div className="delete-form">
                                    <label>ID de la Recomendación:</label>
                                    <input
                                        type="text"
                                        value={searchID}
                                        onChange={(e) => setSearchID(e.target.value)}
                                        placeholder="Ingrese ID"
                                    />
                                    <button type="button" onClick={() => handleSearchRecommendation(searchID)}>
                                        Buscar
                                    </button>
                                </div>
                            {selectedRecommendation && (
                                <div className="delete-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Medicamento</th>
                                                <th>Notas</th>
                                                <th>Condiciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{selectedRecommendation.id_recommendation}</td>
                                                <td>{selectedRecommendation.id_medication}</td>
                                                <td>{selectedRecommendation.note}</td>
                                                <td>{selectedRecommendation.recommendation}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="delete-actions">
                                        <button onClick={handleDeleteRecommendation}>Eliminar</button>
                                        <button onClick={handleCancelDelete}>Cancelar</button>
                                    </div>
                                </div>
                            )}
                            {!selectedRecommendation && searchID && (
                            <p>No se encontró una recomendación con el ID proporcionado.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    )
}

export default Recomendaciones;
