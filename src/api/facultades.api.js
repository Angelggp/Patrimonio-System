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

  
