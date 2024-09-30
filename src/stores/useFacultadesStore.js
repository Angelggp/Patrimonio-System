import { create } from 'zustand';
import { getFacultadesSede } from '../api/facultades.api';

const useFacultadesStore = create((set) => ({
  facultades: [],
  error: null,
  fetchFacultades: async (id) => {
    try {
      const data = await getFacultadesSede(id); // Obtiene las facultades asociadas a la sede dada
      set({ facultades: data, error: null }); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      set({ error: "No se pudieron cargar las facultades." }); 
      console.error("Error al obtener facultades:", error);
    }
  },
  clearFacultades: () => set({ facultades: [], error: null }), // Método para limpiar las facultades y el error
}));

export default useFacultadesStore;