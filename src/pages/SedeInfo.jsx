import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSedesStore from '../stores/useSedesStore'; 
import { ChevronDown } from 'lucide-react';
import useFacultadesStore from '../stores/useFacultadesStore';

const InfoSede = () => {
  const { id } = useParams(); 
  const { sedes } = useSedesStore(); 
  const { facultades } = useFacultadesStore()
  const [activeTab, setActiveTab] = useState(null);
  const [sede, setSede] = useState(null); 
  const [error, setError] = useState(null); 


  useEffect(() => {
    // Filtra la sede correspondiente al id de la URL
    const selectedSede = sedes.find(s => s.id === parseInt(id)); // Convierte id a número
    if (selectedSede) {
      setSede(selectedSede);
    } else {
      setError("No se encontró la sede."); // Manejo del caso donde no se encuentra la sede
    }
  }, [id, sedes]); // Dependencias: id y sedes

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  if (error) return <div>{error}</div>; // Muestra un mensaje de error si ocurre
  if (!sede) return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtiene la sede

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <main className="flex-grow container mx-auto px-4 py-12 relative z-10 mt-16">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={sede.imagen} alt={sede.nombre_sede} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{sede.nombre_sede}</h1>
            <p className="text-gray-600 mb-4">{sede.descripcion}</p>
            <p className="text-gray-700 mb-4">{sede.historia}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Contacto</h2>
                <p className="text-gray-600">{sede.telefono}</p>
                <p className="text-gray-600">{sede.correo}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Dirección</h2>
                <p className="text-gray-600">{sede.ubicacion}</p>
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
  );
};

export default InfoSede;

