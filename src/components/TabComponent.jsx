import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronDown, AlertCircle } from "lucide-react"; // Asegúrate de importar tus íconos correctamente

const TabComponent = ({ 
  title, 
  items, // Cambiado de areasSedes a items
  isLoggedIn, 
  handleAddItem, // Cambiado de handleAddArea a handleAddItem
  activeTab, 
  toggleTab 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      <button
        onClick={() => toggleTab(title.toLowerCase())}
        className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg focus:outline-none hover:bg-gray-200 transition-colors duration-200"
      >
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <div className="flex items-center">
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={handleAddItem}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="mr-2 p-1 rounded-full hover:bg-gray-300 focus:outline-none transition-colors duration-200"
                aria-label={`Agregar ${title.toLowerCase()}`}
              >
                <Plus className="h-5 w-5 text-gray-600" />
              </button>
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg">
                  Agregar {title.toLowerCase()}
                </div>
              )}
            </div>
          )}
          <ChevronDown
            className={`h-5 w-5 transform transition-transform duration-200 ${
              activeTab === title.toLowerCase() ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {activeTab === title.toLowerCase() && (
        <ul className="mt-2 space-y-2 pl-4">
          {items.length === 0 ? (
            <li className="text-red-600 flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <span className="ml-2">No hay {title} asociadas a esta sede</span>
            </li>
          ) : (
            items.map((item) => (
              <li key={item.id} className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                <Link to={`/${title.toLowerCase()}/${item.id}`} className="block py-1">
                  {item.nombre_area || item.nombre_facultad} {/* Ajustar según el tipo de item */}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default TabComponent;