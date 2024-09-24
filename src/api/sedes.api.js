import axios from 'axios';

const API_URL = 'http://localhost:8000/api/sedes/';

// Obtener todas las sedes
export const getSedes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Devuelve la lista de sedes
  } catch (error) {
    console.error("Error al obtener sedes:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};


// Agregar una nueva sede
export const addSede = async (sedeData) => {
  try {
    const response = await axios.post(API_URL, sedeData);
    return response.data; // Devuelve la sede creada
  } catch (error) {
    console.error("Error al agregar sede:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Editar una sede existente
export const editSede = async (id, sedeData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, sedeData);
    return response.data; // Devuelve la sede actualizada
  } catch (error) {
    console.error("Error al editar sede:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Eliminar una sede
export const deleteSede = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
    return id; // Devuelve el id de la sede eliminada
  } catch (error) {
    console.error("Error al eliminar sede:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};