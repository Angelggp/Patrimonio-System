import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import Fondo from "../assets/portada.jpg";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Manchas de colores de fondo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
        <div className="w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-2xl"></div>
        <div className="w-96 h-96 bg-indigo-800 rounded-full mix-blend-multiply filter blur-2xl -ml-20"></div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow container mx-auto px-4  flex flex-col lg:flex-row items-center justify-center min-h-screen relative z-10">
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 lg:ml-10">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Sistema de Gestión del{" "}
            <span className="text-blue-600 lg:text-[70px]">
              Patrimonio Universitario
            </span>{" "}
            de la Universidad de Cienfuegos
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 mb-6">
            Conoce sobre el patrimonio de nuestras sedes!
          </p>
          <Link
            to="/sedes"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 inline-flex items-center">
            <MapPin className="mr-2 h-5 w-5" /> Ver Sedes
          </Link>
        </div>
        <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
          <div className="relative overflow-hidden rounded-lg transform rotate-6 hover:rotate-0 transition-transform duration-300 max-w-md mx-auto w-11/12">
            <img
              src={Fondo}
              alt="Universidad"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-yellow-500 mix-blend-multiply opacity-50"></div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-sm -z-10"></div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-800 rounded-full mix-blend-multiply filter blur-sm"></div>

          <div className="absolute -buttom-8 -right-4 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-sm"></div>
          <div className="absolute -top-8 -left-4 w-16 h-16 bg-blue-500 rounded-full mix-blend-multiply filter blur-sm -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
