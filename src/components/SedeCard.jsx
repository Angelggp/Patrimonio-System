import React from "react";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";

const SedeCard = ({ sede, isLoggedIn, onEdit }) => {
  return (
    
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Link to='/info-sede'>
        <img
          src={sede.image}
          alt={sede.name}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {sede.name}
          </h2>
          <p className="text-gray-600 mb-4">{sede.description}</p>
          {isLoggedIn && (
            <button
              onClick={() => onEdit(sede.id)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300">
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
