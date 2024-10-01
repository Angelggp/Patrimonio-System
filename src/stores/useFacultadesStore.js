import { create } from 'zustand';
import { getFacultades } from '../api/facultades.api';



const useFacultadesStore = create((set) => ({
  facultades: [],
  error: null,

  fetchFacultades: async () => {
    try {
      const data = await getFacultades(); // Obtiene todas las facultades
      set({ facultades: data, error: null }); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      set({ error: "No se pudieron cargar las facultades." }); 
      console.error("Error al obtener facultades:", error);
    }
  },

  clearFacultades: () => set({ facultades: [], error: null }), // Método para limpiar las facultades y el error
}));

export default useFacultadesStore;