import axios from 'axios';

const API_URL = 'http://localhost:8000/api/facultades/';

export const getFacultades = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener facultades:", error);
    throw error; 
  }
};

  
export const getFacultadesSede = async (sedeId) => {
  try {
    const response = await axios.get(API_URL, {
      params: { sede: sedeId } // Suponiendo que la API acepta un parámetro de consulta para filtrar por sede
    });
    return response.data; 
  } catch (error) {
    console.error("Error al obtener facultades:", error);
    throw error; 
  }
};
