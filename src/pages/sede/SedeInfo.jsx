import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useSedesStore from "../../stores/useSedesStore";
import { ChevronDown, AlertCircle, Plus, ArrowLeft } from "lucide-react";
import useFacultadesStore from "../../stores/useFacultadesStore";
import useAreasStore from "../../stores/useAreasStore";
import useAuthStore from "../../stores/AuthStore";
import ArrowLeftButton from "../../components/ArrowLeftButtom";

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

  const navigate = useNavigate();

  const handleAddFacultad = () => {
    navigate(`/sedes/${id}/addFacultad/`);
  };

  const handleAddArea = (e) => {
    e.stopPropagation();
    // Lógica para agregar una nueva área
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchFacultades();
      await fetchAreas();
    };

    fetchData();
  }, [fetchFacultades, fetchAreas]);


  useEffect(() => {
    const selectedSede = sedes.find((s) => s.id === parseInt(id));
    if (selectedSede) {
      setSede(selectedSede);
    } else {
      setError("No se encontró la sede.");
    }
  }, [id, sedes]);

  const facultadesSede = facultades.filter(
    (facultad) => facultad.sede_info.id === parseInt(id)
  );

  const areasSedes = areas.filter((area) => area.sede.id === parseInt(id));

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const handleReturn = () => {
    navigate("/sedes");
  };

  if (error) return <div>{error}</div>;
  if (!sede) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <main className="flex-grow container mx-auto px-4 py-12 relative z-10 mt-16">
        <ArrowLeftButton
          handleReturn={handleReturn}
          text={"Volver al listado de Sedes"}
        />
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
                  className="w-full flex justify-between items-center bg-gray-100 p-3 rounded-lg focus:outline-none hover:bg-gray-200 transition-colors duration-200">
                  <span className="text-lg font-semibold text-gray-800">
                    Áreas
                  </span>
                  <div className="flex items-center">
                    {isLoggedIn && (
                      <div className="relative">
                        <span
                          onMouseEnter={() => setShowTooltipA(true)}
                          onMouseLeave={() => setShowTooltipA(false)}
                          className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-gray-100 hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                          aria-label="Agregar área"
                          onClick={handleAddArea}>
                          <Plus className="h-5 w-5 text-gray-600" />
                        </span>
                        {showTooltipA && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-1 bg-gray-800 text-white text-xs rounded shadow-lg">
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
                          className="text-gray-600 hover:underline transition-all duration-200">
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
                  <button
                    onClick={() => toggleTab("facultades")}
                    className="w-full flex justify-between items-center bg-gray-100 p-3 rounded-lg focus:outline-none hover:bg-gray-200 transition-colors duration-200">
                    <span className="text-lg font-semibold text-gray-800">
                      Facultades
                    </span>
                    <div className="flex items-center">
                      {isLoggedIn && (
                        <div className="relative">
                          <span
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-gray-100 hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                            aria-label="Agregar facultad"
                            onClick={handleAddFacultad}>
                            <Plus className="h-5 w-5 text-gray-600" />
                          </span>
                          {showTooltip && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-1 bg-gray-800 text-white text-xs rounded shadow-lg">
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
                  </button>

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
                            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:underline">
                            <Link
                              to={`/sedes/${id}/facultad/${facultad.id}`}
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
              <Link to={"/docentes"} className="block py-1">
                <div className="w-full flex justify-between items-center bg-gray-100 p-3 rounded-lg focus:outline-none hover:bg-gray-200 transition-colors duration-200">
                  <span className=" text-gray-600 hover:text-gray-800 transition-colors duration-200 font-bold">
                    Docentes
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfoSede;
