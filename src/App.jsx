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
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { jwtDecode } from "jwt-decode"; // descodificar el token
import InfoSede from "./pages/InfoSede";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const [userName, setUserName] = useState(""); // Nombre del usuario, puedes ajustarlo según tu lógica

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setUserName(decodedToken.username); // Asegúrate de que el token contenga el campo 'username'
      console.log(decodedToken);
    } else {
      console.log("El token no contiene el campo 'username'");
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token"); // Elimina el token al cerrar sesión
  };

  return (
    <Router>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow">
          <Navbar isLoggedIn={true}/>

          <main className="flex-grow">
            <Routes>
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/sedes" element={<SedesPage />} />
              <Route path="/info-sede" element={<InfoSede />} />
              <Route
                path="/login"
                element={
                  <Login
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  />
                }
              />
              <Route path="/" element={<Navigate to="/homepage" />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;
