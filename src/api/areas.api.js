import axios from 'axios';
const API_URL = 'http://localhost:8000/api/areas/';
const API_URL_TIPO = 'http://localhost:8000/api/tipo-area/'


export const getTipoAreaSede = async () => {
  try {
    const response = await axios.get(API_URL_TIPO);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener el tipo de area:", error);
    throw error; 
  }
}

export const getAreasSede = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener areas de la sede:", error);
    throw error; 
  }
};

export const getAreaSedeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener el área de sede:', error);
    throw error; 
  }
};

export const addAreaSede = async (areaSedeData) => {
  try {
    const response = await axios.post(API_URL, areaSedeData);
    return response.data; 
  } catch (error) {
    if (error.response) {
      throw new Error('Error al agregar el área de sede: ' + (error.response.data.detail || error.response.data));
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor.');
    } else {
      throw new Error('Error en la configuración de la solicitud: ' + error.message);
    }
  }
};

export const editAreaSede = async (id, areaSedeData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, areaSedeData);
    return response.data; 
  } catch (error) {
    if (error.response) {
      throw new Error('Error al editar el área de sede: ' + (error.response.data.detail || error.response.data));
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor.');
    } else {
      throw new Error('Error en la configuración de la solicitud: ' + error.message);
    }
  }
};