import { create } from 'zustand'
import { persist } from 'zustand/middleware';


const useAuthStore = create(persist(
  (set) => ({
    isLoggedIn: false,
    user: null,
    login: (userData) => set({ isLoggedIn: true, user: userData }),
    logout: () => set({ isLoggedIn: false, user: null }),
  }),
  {
    name: 'authStore', // Nombre de la clave en localStorage
    getStorage: () => localStorage, // Opcional: especificar el almacenamiento
  }
));

export default useAuthStore;