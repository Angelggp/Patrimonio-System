import { create } from 'zustand';
import { getAreasSede } from '../api/areas.api';

const useAreasStore = create((set) => ({
  areas: [],
  error: null,

  fetchAreas: async () => {
    try {
      const data = await getAreasSede(); // Obtiene todas las áreas
      set({ areas: data, error: null }); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      set({ error: "No se pudieron cargar las áreas." });
      console.error("Error al obtener áreas:", error);
    }
  },

  clearAreas: () => set({ areas: [], error: null }), // Método para limpiar las áreas y el error
}));

export default useAreasStore;