import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user.api";
import { User, Lock, AlertCircle } from "lucide-react";
import useAuthStore from "../stores/AuthStore";

const Login = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const login = useAuthStore(state => state.login); // Get the login function from the auth store

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor ingresa ambos campos.");
      return;
    }
    try {
      const data = await loginUser(username, password);
      if (data.access) {
        login({ username }); // Use the login function from the store
        localStorage.setItem('access_token', data.access); // Store the token
        navigate("/homepage");
      }
    } catch (err) {
      setError('Credenciales inválidas'); // Error handling
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 md:m-2">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 m-2">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                required
                autoComplete="current-password" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Iniciar Sesión
            </button>
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;



