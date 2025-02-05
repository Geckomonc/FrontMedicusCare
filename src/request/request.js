import axios from 'axios';

const api = axios.create({
    baseURL: 'https://medicus-care-back-end.vercel.app/api/', 
});

export async function signUp(user) {
    try {
        user.is_patient = true
        const response = await api.post("/login/sign-up", user);
        return response.data;
    } catch (error) {
        console.error("Error en signUp:", error);
        throw error;
    }
}

export async function signIn(user) {
    /*
    try {
        const response = await api.post("/login", user);
        return response.data;
    } catch (error) {
        console.error("Error en signIn:", error);
        throw error;
    }*/
    try {
        const response = await api.post("/login", user);
        if (response.data && response.data.email) {
            localStorage.setItem("userEmail", response.data.email);
        }
        return response.data;
    } catch (error) {
        console.error("Error en signIn:", error);
        throw error;
    }
}

export async function addMedication(medication) {
    try {
        const token = localStorage.getItem("id");  // Obtener el token JWT

        // Configurar los headers con Authorization
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,  // Adjuntar el token en el header
            },
        };

        // Enviar la solicitud con el token
        medication.id_user = token
        const response = await api.post(`/medications/create`, medication, config);
        return response.data;
    } catch (error) {
        console.error("Error al agregar el medicamento:", error);
        throw error;
    }
}

export async function getMedications() {
    try {
        const token = localStorage.getItem("id");  // Obtener el token del almacenamiento local

        // Configuración de headers con el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // Hacer la solicitud GET con los headers configurados
        const response = await api.get(`/medications/${token}`, config);
        return response.data;  // Devolver los medicamentos del usuario autenticado
    } catch (error) {
        console.error("Error al obtener los medicamentos:", error);
        throw error;
    }
}

export async function getMedicationById(id) {
    try {
        const token = localStorage.getItem("id");  // Obtener el token del almacenamiento local

        // Verificar si el token está disponible
        if (!token) {
            throw new Error("Token no encontrado en el almacenamiento local.");
        }

        // Configuración de headers con el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,  // Corrección del template literal
            },
            params: {
                id: id,
                id_user: token
            },
        };

        // Hacer la solicitud GET con el ID del medicamento
        const response = await api.get('medications/get/medication', config);
        console.log(response.data);
        return response.data;  // Devolver la información del medicamento encontrado
    } catch (error) {
        console.error("Error al obtener el medicamento:", error);
        throw error;
    }
}


export async function updateMedication(id, updatedMedication) {
    try {
        const token = localStorage.getItem("id");  // Obtener el token

        // Configuración de headers con el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        updatedMedication.id_user = token
        updatedMedication.type_of_drug = 1
        updateMedication.id_medication = id
        // Enviar la solicitud PUT con los datos actualizados
        const response = await api.put(`medications/edit`, updatedMedication, config);
        console.log(updateMedication)
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el medicamento:", error);
        throw error;
    }
}

export async function deleteMedication(id) {
    try {
        const token = localStorage.getItem("id");  // Obtener el token

        // Configuración de headers con el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: id,
                id_user: token
            },
        };

        // Hacer la solicitud DELETE

        const response = await api.delete(`/medications/delete`, config);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el medicamento:", error);
        throw error;
    }
}

//Recomendaciones

export async function addRecommendation(recommendation) {
    try {
        const token = localStorage.getItem("id"); // Obtener el token

        // Configuración de headers con el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        recommendation.id_user = token
        // Enviar la solicitud POST con la recomendación
        const response = await api.post(`/recommendations/create`, recommendation, config);
        return response.data;
    } catch (error) {
        console.error("Error al agregar la recomendación:", error);
        throw error;
    }
}

export async function getRecommendations() {
    try {
        const token = localStorage.getItem("id"); // Obtener el token del almacenamiento local

        // Configuración de headers con el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // Hacer la solicitud GET para obtener recomendaciones
        const response = await api.get(`/recommendations/getall/${token}`, config);
        return response.data; // Suponiendo que devuelve un array de recomendaciones
    } catch (error) {
        console.error("Error al obtener las recomendaciones:", error);
        throw error;
    }
}

// Obtener una recomendación por ID
export async function getRecommendationById(id) {
    try {
        const token = localStorage.getItem("id");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: id,
                id_user: token
            },
        };

        const response = await api.get(`/recommendations/get/recommendation`, config);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la recomendación:", error);
        throw error;
    }
}

// Actualizar recomendación
export async function updateRecommendation(id, updateRecommendation) {
    try {
        const token = localStorage.getItem("id");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        updateRecommendation.id_recommendation = id
        updateRecommendation.id_user = token
        console.log(updateRecommendation)
        const response = await api.put(`/recommendations/edit`, updateRecommendation, config);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la recomendación:", error);
        throw error;
    }
}


export async function deleteRecommendation(id) {
    try {
        const token = localStorage.getItem("id");  // Obtener el token

        // Configuración de headers con el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: id,
                id_user: token
            },
        };
        // Hacer la solicitud DELETE
        const response = await api.delete(`/recommendations/delete`, config);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la recomendación:", error);
        throw error;
    }
}



//Registro de medicación

export async function addRegisterMedication(medication) {
    try {
        const patient = localStorage.getItem("patient");

        // Configuración de headers con Authorization
        const config = {
            headers: {
                Authorization: `Bearer ${patient}`,  // Adjuntar el token en el header
            },
        };
        medication.id_patient = patient;
        console.log(patient)
        console.log(medication)
        console.log(medication.id_record)
        // Enviar la solicitud con el token
        const response = await api.post(`/medications/records/create`, medication, config);
        return response.data;
    } catch (error) {
        console.error("Error al agregar el medicamento:", error);
        throw error;
    }
}

export async function getRegisterMedications() {
    try {
        const patient = localStorage.getItem("patient");// Obtener el token del almacenamiento local

        // Configuración de headers con el token
        const config = {
            headers: {
                Authorization: `Bearer ${patient}`,
            },
        };

        // Hacer la solicitud GET para obtener recomendaciones
        const response = await api.get(`/medications/records/${patient}`, config);
        return response.data; // Suponiendo que devuelve un array de recomendaciones
    } catch (error) {
        console.error("Error al obtener las recomendaciones:", error);
        throw error;
    }
}

// Obtener una registro del medicamento por ID
export async function getRegisterMedicationById(id) {
    try {
        const patient = localStorage.getItem("patient");
        const config = {
            headers: {
                Authorization: `Bearer ${patient}`,
            },
            params: {
                id: id,
                id_patient: patient
            },
        };
        const response = await api.get(`/medications/records/get/record`, config);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la recomendación:", error);
        throw error;
    }
}


// Actualizar registro de medicación
export async function updateRegisterMedication(id, updateRegisterMedication) {
    try {
        const patient = localStorage.getItem("patient");
        const config = {
            headers: {
                Authorization: `Bearer ${patient}`,
            },
        };
        console.log(updateRegisterMedication)
        updateRegisterMedication.id_patient = patient
        const response = await api.put(`/medications/records/edit`, updateRegisterMedication, config);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el registro del medicamento:", error);
        throw error;
    }
}

//Eliminar registro de medicación

export async function deleteRegisterMedication(id) {
    try {
        const patient = localStorage.getItem("patient");  // Obtener el token
        // Configuración de headers con el token
        const config = {
            headers: {
                Authorization: `Bearer ${patient}`,
            },
            params: {
                id: id,
                id_patient: patient
            },
        };
        // Hacer la solicitud DELETE
        const response = await api.delete(`/medications/records/delete`, config);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la recomendación:", error);
        throw error;
    }
}

//Obtener los tipos de drogas

export async function getDrugTypes() {
    try {
        const token = localStorage.getItem("id");  // Obtener el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await api.get(`/medications/types/get`, config);  // Cambia la URL si es diferente en tu backend
        return response.data;  // Devolver los datos obtenidos
    } catch (error) {
        console.error("Error al obtener los tipos de droga:", error);
        throw error;
    }
}

export async function getNewAlert() {
    try {
        const token = localStorage.getItem("id");  // Obtener el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await api.get(`/alerts/types`, config);  // Cambia la URL si es diferente en tu backend
        return response.data;  // Devolver los datos obtenidos
    } catch (error) {
        console.error("Error al obtener los tipos de droga:", error);
        throw error;
    }
}

export async function sendEmailNotification(notificationData) {
    try {
        const token = localStorage.getItem("id");  // Obtener el token del usuario
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        
        notificationData.id_user = token
        // Enviar la solicitud POST con los datos de la notificación
        const response = await api.post(`/alerts/request`, notificationData, config);
        return response.data;
    } catch (error) {
        console.error("Error al enviar la notificación por correo:", error);
        throw error;
    }
}

export async function sendContactMessage(contactData) {
    try {
        const response = await api.post("/contact", contactData);
        return response.data;
    } catch (error) {
        console.error("Error al enviar el mensaje de contacto:", error);
        throw error;
    }
}
