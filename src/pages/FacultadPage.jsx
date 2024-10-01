import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useFacultadesStore from '../stores/useFacultadesStore'
import { Phone, Mail, FileText, History, Building2, Award, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'

export default function InfoFacultadPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { facultades, fetchFacultades } = useFacultadesStore()
  const [showHistory, setShowHistory] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    fetchFacultades()
  }, [fetchFacultades])

  const facultad = facultades.find(f => f.id === parseInt(id))

  if (!facultad) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const handleReturn = () => {
    navigate(`/sedes/${facultad.sede.id}`)
  }


  return (
    <div className=" bg-gray-100 py-12 px-4 mt-16 sm:px-6 lg:px-8">
        <button
          onClick={handleReturn}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver a la Sede
        </button>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900">{facultad.nombre_facultad}</h1>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-400" />
                Teléfono
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{facultad.telefono}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                Correo
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{facultad.correo}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-gray-400" />
                Número de Acuerdo
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{facultad.numero_acuerdo}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:px-6">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <span className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-gray-400" />
                  Historia
                </span>
                {showHistory ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {showHistory && (
                <dd className="mt-2 text-sm text-gray-900">{facultad.historia}</dd>
              )}
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-gray-400" />
                Estado de Conservación
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{facultad.estado_conservacion}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-gray-400" />
                Estructura
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{facultad.estructura}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Award className="mr-2 h-5 w-5 text-gray-400" />
                Valores
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{facultad.valores}</dd>
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
                <dd className="mt-2 text-sm text-gray-900">{facultad.descripcion}</dd>
              )}
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}