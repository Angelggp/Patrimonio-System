// import { create } from 'zustand'
// import { getSedes } from '../api/sedes.api'; // Asegúrate de ajustar la ruta

// const useSedesStore = create((set) => ({
//   sedes: [],
//   error: null,
//   fetchSedes: async () => {
//     try {
//       const data = await getSedes(); // Obtiene las sedes directamente
//       set({ sedes: data, error: null }); // Actualiza el estado con los datos obtenidos
//     } catch (error) {
//       set({ error: "No se pudieron cargar las sedes." }); // Manejo del error
//       console.error("Error al obtener sedes:", error);
//     }
//   },
// }));

// export default useSedesStore;


import { create } from 'zustand';
import { getSedes } from '../api/sedes.api';
import { getFacultadesSede } from '../api/facultades.api';

const useSedesStore = create((set) => ({
  sedes: [],
  facultades: [],
  areas: [],
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

  fetchFacultades: async (sedeId) => {
    try {
      const facultadesData = await getFacultadesSede(sedeId); // Obtiene las facultades asociadas a la sede
      set({ facultades: facultadesData, error: null }); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      set({ error: "No se pudieron cargar las facultades." }); // Manejo del error
      console.error("Error al obtener facultades:", error);
    }
  },

  fetchAreas: async (sedeId) => {
    try {
      const areasData = await getAreasSede(sedeId); // Obtiene las áreas asociadas a la sede
      set({ areas: areasData, error: null }); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      set({ error: "No se pudieron cargar las áreas." }); // Manejo del error
      console.error("Error al obtener áreas:", error);
    }
  },

  clearData: () => set({ facultades: [], areas: [], error: null }), // Método para limpiar datos
}));

export default useSedesStore;