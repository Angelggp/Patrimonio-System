import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import SedesPage from "./pages/SedePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { jwtDecode } from "jwt-decode"; // descodificar el token
import InfoSede from "./pages/InfoSede";
import useAuthStore from "./AuthStore";


function App() {
  const { login, logout } = useAuthStore(); // Use the Zustand store

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Muestra el token decodificado

        // Realiza una solicitud para obtener la información del usuario usando user_id
        const fetchUserInfo = async (userId) => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/auth/${userId}`); // Ajusta la URL según tu API
            const userInfo = response.data;

            // Asegúrate de que userInfo tenga el campo username
            if (userInfo && userInfo.username) {
              login({ username: userInfo.username }); // Usa la acción de login del store
            } else {
              throw new Error('No se encontró el nombre de usuario');
            }
          } catch (error) {
            console.error("Error fetching user info:", error);
            logout(); // Usa la acción de logout del store si hay un error
          }
        };

        fetchUserInfo(decodedToken.user_id);
        console.log(fetchUserInfo) // Llama a la función con user_id
      } catch (error) {
        console.error("Error decoding token:", error);
        logout(); // Usa la acción de logout del store si hay un error al decodificar
      }
    } else {
      console.log("No token found");
    }
  }, [login, logout]);


  const handleLogout = () => {
    logout(); // Use the logout action from the store
    localStorage.removeItem("access_token");
  };

  return (
    <Router>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/sedes" element={<SedesPage />} />
              <Route path="/sedes/:id" element={<InfoSede />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/homepage" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;