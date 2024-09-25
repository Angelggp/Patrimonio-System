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
import InfoSede from "./pages/SedeInfo";
import useAuthStore from "./stores/AuthStore";
import SedeForm from "./pages/SedeFrom";
import { Toaster } from "react-hot-toast";



function App() {

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
              <Route path="/sedes/add" element={<SedeForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/homepage" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;