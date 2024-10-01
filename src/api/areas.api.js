import axios from 'axios';
const API_URL = 'http://localhost:8000/api/areas/';

export const getAreasSede = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener areas de la sede:", error);
    throw error; 
  }
};