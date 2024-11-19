import axios from 'axios';

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

export default{ signUp, signIn };