import axios from 'axios';
const API_URL = 'http://localhost:8000/api/areas-sede/';

export const getAreasSede = async (sedeId) => {
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