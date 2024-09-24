import React from "react";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";

const SedeCard = ({ sede, isLoggedIn, onEdit }) => {
  return (
    
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Link to={`/sedes/${sede.id}`}>
        <img
          src={sede.imagen}
          // alt={sede.name}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {sede.nombre_sede}
          </h2>
          <p className="text-gray-600 mb-4">{sede.descripcion}</p>
          {isLoggedIn && (
            <button
              onClick={() => onEdit(sede.id)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md flex items-center transition duration-300">
              <Edit className="mr-2" size={16} />
              Editar
            </button>
          )}
        </div>
        </Link>
      </div>
    
  );
};

export default SedeCard;
