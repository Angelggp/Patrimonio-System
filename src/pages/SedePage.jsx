import { Plus } from 'lucide-react'
import useAuthStore from '../stores/AuthStore'
import { useEffect, useState } from 'react'
import SedeCard from '../components/SedeCard'
import useSedesStore from '../stores/useSedesStore'
import SedeForm from './SedeFrom'
import { useNavigate } from 'react-router-dom'
import { getSedeById } from '../api/sedes.api'
import { AlertCircle } from "lucide-react";



const SedesPage = () => {
  const { isLoggedIn } = useAuthStore()
  const { sedes, fetchSedes } = useSedesStore();
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
    navigate(`/sedes/edit/${id}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <div className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center min-h-screen relative z-10 mt-16">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Nuestras Sedes</h1>
            {isLoggedIn && (
              <button
                onClick={handleAddSede}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-md flex items-center transition duration-300"
              >
                <Plus className="mr-2" size={20} />
                Agregar Sede
              </button>
            )}
          </div>
          <div className="space-y-6">
          {sedes.length === 0 ? ( 
              <p className="flex text-gray-500 text-lg">
                <AlertCircle className=" w-8" />  No hay sedes registradas en el sistema.
              </p>
            ) : (
              sedes.map((sede) => (
                <SedeCard
                  key={sede.id}
                  sede={sede}
                  isLoggedIn={isLoggedIn}
                  onEdit={handleEditSede}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SedesPage