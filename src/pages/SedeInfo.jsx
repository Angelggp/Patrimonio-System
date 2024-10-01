import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useSedesStore from "../stores/useSedesStore";
import { ChevronDown, AlertCircle, Plus, ArrowLeft } from "lucide-react";
import useFacultadesStore from "../stores/useFacultadesStore";
import useAreasStore from "../stores/useAreasStore";
import useAuthStore from "../stores/AuthStore";


const InfoSede = () => {
  const { id } = useParams();
  const { sedes } = useSedesStore();
  const { facultades, fetchFacultades } = useFacultadesStore();
  const { areas, fetchAreas } = useAreasStore();
  const { isLoggedIn } = useAuthStore();
  const [activeTab, setActiveTab] = useState(null);
  const [sede, setSede] = useState(null);
  const [error, setError] = useState(null);
  const [showTooltipA, setShowTooltipA] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [facultadesSede, setFacultadesSede] = useState([]);
  const [areasSedes, setAreasSedes] = useState([]);

  const navigate = useNavigate()

  const handleAddFacultad = () => {
    // Lógica para agregar una nueva facultad
    navigate('/facultad/add')
    console.log("Agregar nueva facultad");
  };

  const handleAddArea = (e) => {
    e.stopPropagation();
    // Logic to add a new area
    console.log("Agregar nueva área");
  };

  useEffect(() => {
    fetchFacultades();
  }, [fetchFacultades]);

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);
  console.log(areasSedes);

  useEffect(() => {
    // Filtrar las facultades que pertenecen a la sede especificada
    const filteredFacultades = facultades.filter(
      (facultad) => facultad.sede.id === parseInt(id)
    );
    setFacultadesSede(filteredFacultades);
  }, [facultades, id]);

  useEffect(() => {
    // Filtrar las areas que pertenecen a la sede especificada
    const filteredAreas = areas.filter((a) => a.sede.id === parseInt(id));
    setAreasSedes(filteredAreas);
  }, [areas, id]);

  useEffect(() => {
    // Filtra la sede correspondiente al id de la URL
    const selectedSede = sedes.find((s) => s.id === parseInt(id)); // Convierte id a número
    if (selectedSede) {
      setSede(selectedSede);
    } else {
      setError("No se encontró la sede."); // Manejo del caso donde no se encuentra la sede
    }
  }, [id, sedes]); // Dependencias: id y sedes

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const handleReturn = () => {
    navigate('/sedes')
  }


  if (error) return <div>{error}</div>; // Muestra un mensaje de error si ocurre
  if (!sede) return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtiene la sede

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <main className="flex-grow container mx-auto px-4 py-12 relative z-10 mt-16">
      <button
          onClick={handleReturn}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver al listado de sedes
        </button>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={sede.imagen}
            alt={sede.nombre_sede}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {sede.nombre_sede}
            </h1>
            <p className="text-gray-600 mb-4">{sede.descripcion}</p>
            <p className="text-gray-700 mb-4">{sede.historia}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Contacto
                </h2>
                <p className="text-gray-600">{sede.telefono}</p>
                <p className="text-gray-600">{sede.correo}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Dirección
                </h2>
                <p className="text-gray-600">{sede.ubicacion}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => toggleTab("areas")}
                  className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg focus:outline-none hover:bg-gray-200 transition-colors duration-200">
                  <span className="text-lg font-semibold text-gray-800">
                    Áreas
                  </span>
                  <div className="flex items-center">
                    {isLoggedIn && (
                      <div className="relative">
                        <button
                          onClick={handleAddArea}
                          onMouseEnter={() => setShowTooltipA(true)}
                          onMouseLeave={() => setShowTooltipA(false)}
                          className="mr-2 p-1 rounded-full hover:bg-gray-300 focus:outline-none transition-colors duration-200"
                          aria-label="Agregar área">
                          <Plus className="h-5 w-5 text-gray-600" />
                        </button>
                        {showTooltipA && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg">
                            Agregar área
                          </div>
                        )}
                      </div>
                    )}
                    <ChevronDown
                      className={`h-5 w-5 transform transition-transform duration-200 ${
                        activeTab === "areas" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
                {activeTab === "areas" && (
                  <ul className="mt-2 space-y-2 pl-4">
                    {areasSedes.length === 0 ? (
                      <li className="text-red-600 flex items-center">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <span className="ml-2">
                          No hay Áreas asociadas a esta sede
                        </span>
                      </li>
                    ) : (
                      areasSedes.map((area) => (
                        <li
                          key={area.id}
                          className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                          <Link to={`/area/${area.id}`} className="block py-1">
                            {area.nombre_area}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
              <div>
                <div>
                  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    <button
                      onClick={() => toggleTab("facultades")}
                      className="flex-grow text-left focus:outline-none">
                      <span className="text-lg font-semibold text-gray-800">
                        Facultades
                      </span>
                    </button>
                    <div className="flex items-center">
                      {isLoggedIn && (
                        <div className="relative">
                          <button
                            onClick={handleAddFacultad}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className="mr-2 p-1 rounded-full hover:bg-gray-300 focus:outline-none transition-colors duration-200"
                            aria-label="Agregar facultad">
                            <Plus className="h-5 w-5 text-gray-600" />
                          </button>
                          {showTooltip && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg">
                              Agregar facultad
                            </div>
                          )}
                        </div>
                      )}
                      <ChevronDown
                        className={`h-5 w-5 transform transition-transform duration-200 ${
                          activeTab === "facultades" ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                  {activeTab === "facultades" && (
                    <ul className="mt-2 space-y-2 pl-4">
                      {facultadesSede.length === 0 ? (
                        <li className="text-red-600 flex items-center">
                          <AlertCircle className="w-6 h-6 text-red-600" />
                          <span className="ml-2">
                            No hay facultades asociadas a esta sede
                          </span>
                        </li>
                      ) : (
                        facultadesSede.map((facultad) => (
                          <li
                            key={facultad.id}
                            className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                            <Link
                              to={`/facultad/${facultad.id}`}
                              className="block py-1">
                              {facultad.nombre_facultad}
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfoSede;
