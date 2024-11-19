import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import "../styles/Medicamentos.css";

function Medicamentos() {
    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [showMedications, setShowMedications] = useState(false);
    const [showRegisterMedications, setShowRegisterMedications] = useState(false);

    const [selectedMedication, setSelectedMedication] = useState(null);
    const [searchID, setSearchID] = useState("");
    const [medications, setMedications] = useState(medicationsTest);

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
    //Funcionalidad de eliminar medicamento inicio
    const handleShowRegisterMedications = () => {
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
    //Funcionalidad de eliminar medicamento fin

    const handleSearchMedication = (id) => {
        // Buscar el medicamento por ID
        const medication = medicationsTest.find((med) => med.id === id);
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
            setShowForm(false);
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
                    <form className="medication-edit">
                        <div>
                            <label>ID del Medicamento:</label>
                                <input
                                    type="text"
                                    onChange={(e) => handleSearchMedication(e.target.value)}
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
                                        value={selectedMedication.id_type_of_drug}
                                        onChange={(e) =>
                                            setSelectedMedication({ ...selectedMedication, id_type_of_drug: e.target.value })
                                        }
                                    >
                                        <option value="pastilla">Pastilla</option>
                                        <option value="jeringa">Jeringa</option>
                                        <option value="jarabe">Jarabe</option>
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
                                    {medicationsTest.map((med, index) => (
                                        <tr key={index}>
                                            <td>{med.id}</td>
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
                    <div className='content-delete'>
                        <div className="delete-form">
                            <label>ID del Medicamento:</label>
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
                                            <th>Nombre</th>
                                            <th>Contraindicaciones</th>
                                            <th>Notas</th>
                                            <th>Tipo de Droga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{selectedMedication.id}</td>
                                            <td>{selectedMedication.name}</td>
                                            <td>{selectedMedication.contradictions}</td>
                                            <td>{selectedMedication.notes}</td>
                                            <td>{selectedMedication.id_type_of_drug}</td>
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

export default Medicamentos;

const medicationsTest = [
    {
    "id": "1",
    "name": "Acetaminofen",
    "contradictions": "Dolor de pecho",
    "notes": "Tomarse cada 6 horas minimo",
    "id_type_of_drug": "pastilla"
    },
    {
    "id": "2",
    "name": "Ibuprofeno",
    "contradictions": "cancér de pulmón",
    "notes": "ojo con la taquicardia",
    "id_type_of_drug": "pastilla"
    }
]
