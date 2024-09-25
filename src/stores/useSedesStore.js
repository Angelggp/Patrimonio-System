import { create } from 'zustand'
import { getSedes } from '../api/sedes.api'; // Asegúrate de ajustar la ruta

const useSedesStore = create((set) => ({
  sedes: [],
  error: null,
  fetchSedes: async () => {
    try {
      const data = await getSedes(); // Obtiene las sedes directamente
      set({ sedes: data, error: null }); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      set({ error: "No se pudieron cargar las sedes." }); // Manejo del error
      console.error("Error al obtener sedes:", error);
    }
  },
}));

export default useSedesStore;