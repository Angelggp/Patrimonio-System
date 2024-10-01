import axios from 'axios'

const API_URL = 'http://localhost:8000/api/docentes/';

export const getDocentes = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; 
    } catch (error) {
      console.error("Error al obtener Docentes:", error);
      throw error; 
    }
  };
  