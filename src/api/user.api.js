import axios from 'axios';

// Configura la URL base de tu API
const API_URL = 'http://127.0.0.1:8000/auth/';

// Función para registrar un nuevo usuario
export const registerUser = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_URL}register/`, {
            username,
            password,
            role,
        });
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        throw error.response.data; // Lanza el error para manejarlo en el componente
    }
};

// Función para iniciar sesión
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, {
            username,
            password,
        });
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        throw error.response.data; // Lanza el error para manejarlo en el componente
    }
};

const fetchUserData = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}${userId}/`); // Ajusta la URL según tu API
        setUser(response.data.username); // Asume que la respuesta contiene el campo 'username'
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
    } finally {
        setLoading(false);
    }
};