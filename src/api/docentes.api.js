import axios from 'axios'

const API_URL = 'http://localhost:8000/api/docentes/';
const CARGOS_URL = 'http://localhost:8000/api/cargos/';

export const getDocentes = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response);
      
      return response.data; 
    } catch (error) {
      console.error("Error al obtener Docentes:", error);
      throw error; 
    }
  };

  export const addDocente = async (docenteData) => {
    try {
        const response = await axios.post(API_URL, docenteData);
        return response.data; 
    } catch (error) {
        console.error("Error al agregar Docente:", error);
        throw error; 
    }
};

export const getCargos = async () => {
  try {
      const response = await axios.get(CARGOS_URL);
      return response.data; 
  } catch (error) {
      console.error("Error al obtener Cargos:", error);
      throw error; 
  }
};