/*import axios from 'axios';

const api = axios.create({
    baseURL: 'https://medicus-care-back-end.vercel.app/api/', 
});

async function signUp(user){
    await api.post("/login/sign-up", user).then(response => {
        return response.data
    }).catch (error => {
        console.log(error)
    })
}

export async function signIn(user) {
    try {
        const response = await api.post("/login", user);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error en signIn:", error);
        console.log(error)
        throw error;
    }
}

export default{ signUp, signIn };*/


import axios from 'axios';

const api = axios.create({
    baseURL: 'https://medicus-care-back-end.vercel.app/api/', 
});

export async function signUp(user) {
    try {
        const response = await api.post("/login/sign-up", user);
        return response.data;
    } catch (error) {
        console.error("Error en signUp:", error);
        throw error;
    }
}

export async function signIn(user) {
    try {
        const response = await api.post("/login", user);
        return response.data;
    } catch (error) {
        console.error("Error en signIn:", error);
        throw error;
    }
}

export async function addMedication(medication) {
    try {
        const response = await api.post("/medications/create", medication);
        return response.data;
    } catch (error) {
        console.error("Error al agregar el medicamento:", error);
        throw error;
    }
}

export async function getMedications() {
    try {
        const response = await api.get("/medications");
        return response.data; // Suponiendo que el back-end devuelve un array de medicamentos
    } catch (error) {
        console.error("Error al obtener los medicamentos:", error);
        throw error;
    }
}