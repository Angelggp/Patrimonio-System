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


export const getFacultadById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener la facultad:', error);
    throw error; // Lanza el error para que sea manejado en el componente
  }
};


export const addFacultad = async (facultadData) => {
  try {
    const response = await axios.post(API_URL, facultadData);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Manejo de errores más específico
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado que no está en el rango de 2xx
      throw new Error('Error al agregar la facultad: ' + error.response.data.detail || error.response.data);
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      throw new Error('No se recibió respuesta del servidor.');
    } else {
      // Ocurrió un error al configurar la solicitud
      throw new Error('Error en la configuración de la solicitud: ' + error.message);
    }
  }
};



export const editFacultad = async (id, facultadData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, facultadData);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Manejo de errores más específico
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado que no está en el rango de 2xx
      throw new Error('Error al editar la facultad: ' + (error.response.data.detail || error.response.data));
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      throw new Error('No se recibió respuesta del servidor.');
    } else {
      // Ocurrió un error al configurar la solicitud
      throw new Error('Error en la configuración de la solicitud: ' + error.message);
    }
  }
};
