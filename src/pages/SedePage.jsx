import { Plus } from 'lucide-react'
import useAuthStore from '../stores/AuthStore'
import { useEffect, useState } from 'react'
import SedeCard from '../components/SedeCard'
import useSedesStore from '../stores/useSedesStore'
import SedeForm from './SedeFrom'
import { useNavigate } from 'react-router-dom'
import { getSedeById } from '../api/sedes.api'



const SedesPage = () => {
  const { isLoggedIn } = useAuthStore()
  const { sedes, error, fetchSedes } = useSedesStore();
  const [currentSede, setCurrentSede] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    fetchSedes(); // Llama a la función para obtener las sedes al montar el componente
  }, [fetchSedes]);


  const handleAddSede = () => {
    // Lógica para agregar una nueva sede
    navigate('/sedes/add')
  }

  const handleEditSede = async (id) => {
    try {
      const sedeToEdit = await getSedeById(id); 
      console.log(sedeToEdit)
      setCurrentSede(sedeToEdit); 
    } catch (error) {
      console.error('Error al cargar los datos de la sede:', error);
      toast.error('Error al cargar los datos de la sede.', {
        position: "bottom-right"
      });
    }
    console.log('Editar sede', currentSede)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <div className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen relative z-10 mt-16">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Nuestras Sedes</h1>
            {isLoggedIn && (
              <button
                onClick={handleAddSede}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md flex items-center transition duration-300"
              >
                <Plus className="mr-2" size={20} />
                Agregar Sede
              </button>
            )}
          </div>
          <div className="space-y-6">
            {sedes.map((sede) => (
              <SedeCard
                key={sede.id}
                sede={sede}
                isLoggedIn={isLoggedIn}
                onEdit={handleEditSede}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SedesPage