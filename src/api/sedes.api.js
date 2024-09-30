import axios from 'axios';

const API_URL = 'http://localhost:8000/api/sedes/';

// Obtener todas las sedes
export const getSedes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Devuelve la lista de sedes
  } catch (error) {
    console.error("Error al obtener sedes:", error);
    throw error; 
  }
};


export const getSedeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`); // Construye la URL usando el ID
    return response.data; // Devuelve los datos de la sede
  } catch (error) {
    console.error("Error al obtener sede:", error);
    throw error; 
  }
};


export const addSede = async (sedeData) => {
    // Crear un objeto FormData
    const formData = new FormData();
    
    // Agregar todos los campos al FormData
    Object.keys(sedeData).forEach(key => {
      formData.append(key, sedeData[key]);
    });
  
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Indica que se está enviando FormData
        },
      });
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error al agregar sede:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al agregar sede');
      } else {
        console.error('Error inesperado:', error);
        throw new Error('Error inesperado al agregar sede');
      }
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