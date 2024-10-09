import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFacultadesStore from "../../../stores/useFacultadesStore";
import useAuthStore from "../../../stores/AuthStore";

import {
  Phone,
  Mail,
  FileText,
  Building2,
  Award,
  ChevronDown,
  ChevronUp,
  Edit
} from "lucide-react";
import ArrowLeftButton from "../../../components/ArrowLeftButtom";

export default function InfoFacultadPage() {
  const { idSede, idFacultad } = useParams();
  const navigate = useNavigate();
  const { facultades, fetchFacultades } = useFacultadesStore();
  const [showHistory, setShowHistory] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const { isLoggedIn } = useAuthStore();


  useEffect(() => {
    fetchFacultades();
    window.scrollTo(0, 0);
  }, [fetchFacultades]);

  const facultad = facultades.find((f) => f.id === parseInt(idFacultad));

  if (!facultad) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleReturn = () => {
    navigate(`/sedes/${facultad.sede_info.id}`);
  };

  return (
    <div className=" bg-gray-100 py-12 px-4 mt-16 sm:px-6 lg:px-8">
      <ArrowLeftButton handleReturn={handleReturn} text={"Volver a la Sede"} />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {facultad.nombre_facultad}
          </h1>
          {isLoggedIn && (
            <Link to={`/sedes/${idSede}/editFacultad/${idFacultad}`} className="block py-1">
              <Edit className="ml-2 h-5 w-5 text-gray-400 hover:text-green-500 transition-all duration-100" />
            </Link>
          )}
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-400" />
                Teléfono
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {facultad.telefono}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                Correo
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {facultad.correo}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-gray-400" />
                Número de Acuerdo
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {facultad.numero_acuerdo}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:px-6">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-500 hover:text-gray-700">
                <span className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-gray-400" />
                  Historia
                </span>
                {showHistory ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {showHistory && (
                <dd className="mt-2 text-sm text-gray-900">
                  {facultad.historia}
                </dd>
              )}
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-gray-400" />
                Estado de Conservación
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {facultad.estado_conservacion}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-gray-400" />
                Estructura
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {facultad.estructura}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Award className="mr-2 h-5 w-5 text-gray-400" />
                Valores
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {facultad.valores}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:px-6">
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-500 hover:text-gray-700">
                <span className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-gray-400" />
                  Descripción
                </span>
                {showDescription ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {showDescription && (
                <dd className="mt-2 text-sm text-gray-900">
                  {facultad.descripcion}
                </dd>
              )}
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
