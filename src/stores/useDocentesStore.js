import { create } from 'zustand';
import { getDocentes } from '../api/docentes.api';

const useDocentesStore = create((set) => ({
  docentes: [],
  error: null,

  fetchDocentes: async () => {
    try {
      const data = await getDocentes(); // Obtiene todos los docentes
      set({ docentes: data, error: null }); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      set({ error: "No se pudieron cargar los docentes." });
      console.error("Error al obtener docentes:", error);
    }
  },

  clearDocentes: () => set({ docentes: [], error: null }), // Método para limpiar los docentes y el error
}));

export default useDocentesStore;