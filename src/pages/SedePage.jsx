import { Plus } from 'lucide-react'
import useAuthStore from '../AuthStore'
import { useState } from 'react'
import SedeCard from '../components/SedeCard'
import Fondo from "../assets/portada.jpg";


const SedesPage = () => {
  const { isLoggedIn } = useAuthStore()

  const [sedes, setSedes] = useState([
    {
      id: 1,
      name: 'Sede Principal',
      image: Fondo,
      description: 'Nuestra sede principal, ubicada en el corazón de la ciudad.',
    },
    {
      id: 2,
      name: 'Sede Norte',
      image: Fondo,
      description: 'Moderna sede con amplias instalaciones deportivas.',
    },
    {
      id: 3,
      name: 'Sede Sur',
      image: Fondo,
      description: 'Especializada en investigación y desarrollo tecnológico.',
    },
  ])

  const handleAddSede = () => {
    // Lógica para agregar una nueva sede
    console.log('Agregar nueva sede')
  }

  const handleEditSede = (id) => {
    // Lógica para editar una sede
    console.log('Editar sede', id)
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
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300"
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