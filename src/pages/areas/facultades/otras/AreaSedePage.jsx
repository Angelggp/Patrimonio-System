import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuthStore from '../../../../stores/AuthStore'
import useAreasStore from "../../../../stores/useAreasStore"
import { FileText, Building, ChevronDown, ChevronUp, Edit } from 'lucide-react'
import ArrowLeftButton from '../../../../components/ArrowLeftButtom'

export default function InfoAreaSedePage() {
  const { idSede, idAreaSede } = useParams()
  const navigate = useNavigate()
  const { areas, fetchAreas } = useAreasStore()
  const { isLoggedIn } = useAuthStore()
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    fetchAreas()
    window.scrollTo(0, 0);
  }, [fetchAreas])

  const area = areas.find(a => a.id === parseInt(idAreaSede))

  if (!area) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const handleReturn = () => {
    navigate(`/sedes/${area.sede_info.id}`)
  }


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 mt-16 sm:px-6 lg:px-8">
        <ArrowLeftButton handleReturn = {handleReturn} text={'Volver a la Sedes'}/>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      
        <div className="flex px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900">{area.nombre_area}</h1>
        
          {isLoggedIn && (
              <Link to={`/sedes/${idSede}/editAreaSede/${idAreaSede}`} className="block py-1">
                <Edit className="ml-2 h-5 w-5 text-gray-400 hover:text-green-500 transition-all duration-100" />
              </Link>
            )}
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Building className="mr-2 h-5 w-5 text-gray-400" />
                Tipo de Área
              </dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                {area.tipo_area.nombre_tipo_area}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:px-6">
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <span className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-gray-400" />
                  Descripción
                </span>
                {showDescription ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {showDescription && (
                <dd className="mt-2 text-sm text-gray-900">{area.descripcion}</dd>
              )}
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}