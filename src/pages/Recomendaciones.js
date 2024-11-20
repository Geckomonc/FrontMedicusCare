import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import "../styles/Recomendaciones.css";

function Recomendaciones() {
    //Añadir Recomedación
    const [showForm, setShowForm] = useState(false);
    const handleAddRecomendaciones = () => {
        setShowForm(!showForm); // Alternar la visibilidad del formulario
    };

    //Mostrar Recomendación
    const [showRegisterRecomendaciones, setShowRecomendaciones] = useState(false);
    const handleShowRecomendaciones = async () => {
        setShowRecomendaciones(!showRegisterRecomendaciones);
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
    //Editar Recomendación
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [searchID, setSearchID] = useState("");
    const [medications, setMedications] = useState(recomendationTest);

    const [showForm2, setShowForm2] = useState(false);
    const handleEditRecomendaciones = () => {
        setShowForm2(!showForm2);
    };

    const handleSearchMedication = (id) => {
        // Buscar el medicamento por ID
        const medication = recomendationTest.find((med) => med.id === id);
        if (medication) {
            setSelectedMedication(medication);
        } else {
            setSelectedMedication(null); // Si no se encuentra, limpiar selección
        }
    };

    const handleSaveMedication = () => {
        if (selectedMedication) {
            console.log("Recomendación actualizada:", selectedMedication);
            setSelectedMedication(null);
            setShowForm2(false);
        }
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

    const handleSearchMedication2 = () => {
        const medication = medications.find((med) => med.id === searchID);
        setSelectedMedication(medication || null);
    };

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

    ////////////////////////////////////////
    return (
        <div className='recomendaciones'>
            <Sidebar />
            <div className='content-med'>
                <header className='header-med'>
                        <h1>Recomendaciones</h1>
                        <div className='button-option'>
                            <button onClick={handleAddRecomendaciones}>Agregar recomendación</button>
                            <button onClick={handleShowRecomendaciones}>Mostrar recomendaciones</button>
                            <button onClick={handleEditRecomendaciones}>Editar recomendaciones</button>
                            <button onClick={handleDeleteRecomendaciones}>Borrar recomendaciones</button>
                        </div>
                </header>
                {showForm && (
                    <div className='content-recomendation'>                
                        <form className="medication-recomendation">
                            <div>
                                <label>Notas: </label>
                                <textarea name="notas" required></textarea>
                            </div>
                            <div>
                                <label>Condiciones: </label>
                                <textarea name="notas" required></textarea>                            
                            </div>
                            <button type="submit">Guardar Recomendación</button>
                        </form>
                    </div>    
                )}
                <div className='content-table'>
                    {showRegisterRecomendaciones && (
                        <div className='recomendation-table'>
                            <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Notas</th>
                                            <th>Condiciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recomendationTest.map((med, index) => (
                                            <tr key={index}>
                                                <td>{med.id}</td>
                                                <td>{med.note}</td>
                                                <td>{med.conditions}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                            </table>  
                        </div>
                    )}
                </div>
                {showForm2 && (
                    <div className='content-add'>
                        <form className="recomendation-edit">
                            <div>
                                <label>ID de la recomendación:</label>
                                    <input
                                        type="text"
                                        onChange={(e) => handleSearchMedication(e.target.value)}
                                        placeholder="Ingrese ID"
                                    />
                            </div>
                            {selectedMedication && (
                                    <div>
                                        <label>Notas:</label>
                                        <textarea
                                            value={selectedMedication.note}
                                            onChange={(e) =>
                                                setSelectedMedication({ ...selectedMedication, note: e.target.value })
                                            }
                                        />
                                        <label>Condiciones:</label>
                                        <textarea
                                            value={selectedMedication.conditions}
                                            onChange={(e) =>
                                                setSelectedMedication({ ...selectedMedication, conditions: e.target.value })
                                            }
                                        />
                                    </div>
                            )}
                            <div className="form-actions">
                                <button type="button" onClick={handleSaveMedication}>Guardar</button>
                                <button type="button" onClick={handleCancelEdit}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}
                <div className='content-table2'>
                    {showRegisterMedications && (
                        <div className='content-delete'>
                            <div className="delete-form">
                                <label>ID de la recomendación:</label>
                                <input
                                    type="text"
                                    value={searchID}
                                    onChange={(e) => setSearchID(e.target.value)}
                                    placeholder="Ingrese el ID"
                                />
                                <button onClick={handleSearchMedication2}>Buscar</button>
                            </div>
                            {selectedMedication && (
                                <div className="delete-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Notas</th>
                                                <th>Condiciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{selectedMedication.id}</td>
                                                <td>{selectedMedication.note}</td>
                                                <td>{selectedMedication.conditions}</td>
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

export default Recomendaciones;

const recomendationTest = [
    {
    "id": "1",
    "note": "Recuerda tomarla luego del almuerzo",
    "conditions": "Debes haber comido antes de tomarla"
    },
    {
    "id": "2",
    "note": "Recuerda tomarla antes del desayuno",
    "conditions": "Estar en ayunas"
    }
]