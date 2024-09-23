import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'



const InfoSede = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState(null)

  // Simular datos de la sede (en una aplicación real, estos datos vendrían de una API o base de datos)
  const sede = {
    id,
    name: 'Sede Principal',
    image: '/placeholder.svg',
    description: 'Nuestra sede principal, ubicada en el corazón de la ciudad.',
    details: 'Fundada en 1950, la Sede Principal ha sido el centro de excelencia académica por más de 70 años.',
    contact: '+1 234 567 890',
    email: 'info@sedeprincipal.edu',
    address: 'Calle Universidad 123, Ciudad Universitaria, CP 12345',
    areas: ['Biblioteca Central', 'Centro Deportivo', 'Laboratorios de Investigación', 'Auditorio Principal'],
    facultades: ['Facultad de Ciencias', 'Facultad de Ingeniería', 'Facultad de Humanidades', 'Facultad de Medicina']
  }

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">

      <main className="flex-grow container mx-auto px-4 py-12 relative z-10 mt-16">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={sede.image} alt={sede.name} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{sede.name}</h1>
            <p className="text-gray-600 mb-4">{sede.description}</p>
            <p className="text-gray-700 mb-4">{sede.details}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Contacto</h2>
                <p className="text-gray-600">{sede.contact}</p>
                <p className="text-gray-600">{sede.email}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Dirección</h2>
                <p className="text-gray-600">{sede.address}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => toggleTab('areas')}
                  className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-800">Áreas</span>
                  <ChevronDown className={`transform transition-transform ${activeTab === 'areas' ? 'rotate-180' : ''}`} />
                </button>
                {activeTab === 'areas' && (
                  <ul className="mt-2 space-y-2 pl-4">
                    {sede.areas.map((area, index) => (
                      <li key={index} className="text-gray-600">{area}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <button
                  onClick={() => toggleTab('facultades')}
                  className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-800">Facultades</span>
                  <ChevronDown className={`transform transition-transform ${activeTab === 'facultades' ? 'rotate-180' : ''}`} />
                </button>
                {activeTab === 'facultades' && (
                  <ul className="mt-2 space-y-2 pl-4">
                    {sede.facultades.map((facultad, index) => (
                      <li key={index} className="text-gray-600">{facultad}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default InfoSede