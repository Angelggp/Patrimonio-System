import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, LogIn, LogOut, Menu, X } from "lucide-react";
import Actores from "../assets/logo1.png";
import useAuthStore from "../stores/AuthStore";
import useSedesStore from "../stores/useSedesStore"; // Asegúrate de ajustar la ruta

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const { sedes, fetchSedes } = useSedesStore(); // Obtiene las sedes del estado global
  const [showSedes, setShowSedes] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSedes(); // Llama a la función para obtener las sedes al montar el componente
  }, [fetchSedes]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <img
          src={Actores}
          alt="Logo Universidad"
          className="w-36 h-10 object-contain"
        />

        {/* Menú para pantallas grandes */}
        <div className="hidden md:flex items-center space-x-6">
          <NavItems
            isLoggedIn={isLoggedIn}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            showSedes={showSedes}
            setShowSedes={setShowSedes}
            sedes={sedes} // Pasa las sedes desde el estado global
          />
        </div>

        {/* Botón de menú para móviles */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4">
          <NavItems
            isLoggedIn={isLoggedIn}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            showSedes={showSedes}
            setShowSedes={setShowSedes}
            sedes={sedes} // Pasa las sedes desde el estado global
            isMobile={true}
          />
        </div>
      )}
    </nav>
  );
};

const NavItems = ({
  isLoggedIn,
  user,
  onLogin,
  onLogout,
  showSedes,
  setShowSedes,
  sedes,
  isMobile = false
}) => {
  const [localShowSedes, setLocalShowSedes] = useState(false);

  const toggleSedes = () => {
    if (isMobile) {
      setLocalShowSedes(!localShowSedes);
    } else {
      setShowSedes(!showSedes);
    }
  };

  return (
    <div
      className={`${
        isMobile ? "flex flex-col space-y-4" : "flex items-center space-x-6"
      }`}>
      <Link
        to="/"
        className="text-gray-700 hover:text-gray-900 flex items-center whitespace-nowrap">
        Inicio
      </Link>
      <div className={`${isMobile ? "w-full" : "relative"}`}>
        <button
          onClick={toggleSedes}
          className="flex items-center text-gray-700 hover:text-gray-900 w-full justify-between">
          Sedes{" "}
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform ${
              (isMobile ? localShowSedes : showSedes) ? "rotate-180" : ""
            }`}
          />
        </button>
        {(isMobile ? localShowSedes : showSedes) && (
          <div
            className={`${
              isMobile
                ? "mt-2 space-y-2"
                : "absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
            }`}>
              <Link
                to="/sedes"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => {
                  if (isMobile) {
                    setLocalShowSedes(false);
                  } else {
                    setShowSedes(false);
                  }
                }}>
                 Todas las sedes
              </Link>
            {sedes.map((sede) => (
              <Link
                key={sede.id} // Usa el id de la sede como clave
                to={`/sedes/${sede.id}`} // Usa el id en la URL para redirigir a la página de la sede
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  isMobile ? "rounded-md" : ""
                }`}
                onClick={() => {
                  if (isMobile) {
                    setLocalShowSedes(false);
                  } else {
                    setShowSedes(false);
                  }
                }}>
                {sede.nombre_sede} {/* Muestra el nombre de la sede */}
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link
        to="/about" // Cambié href a to para usar React Router
        className="text-gray-700 hover:text-gray-900 flex items-center whitespace-nowrap">
        Acerca de
      </Link>
      {isLoggedIn ? (
        <div
          className={`flex ${
            isMobile ? "flex-col space-y-2" : "items-center space-x-4"
          }`}>
          <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              {user.username.charAt(0)}
            </div>
            <span className="text-gray-700 whitespace-nowrap">
              {user.username}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center w-full whitespace-nowrap">
            <LogOut className="mr-1 h-4 w-4" /> Cerrar
          </button>
        </div>
      ) : (
        <button
          onClick={onLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center w-full whitespace-nowrap">
          <LogIn className="mr-1 h-4 w-4" /> Iniciar
        </button>
      )}
    </div>
  );
};

export default Navbar;
