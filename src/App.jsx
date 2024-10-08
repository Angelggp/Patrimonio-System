import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import HomePage from './pages/HomePage'
import SedesPage from "./pages/sede/SedePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InfoSede from "./pages/sede/SedeInfo";
import SedeForm from "./pages/sede/SedeFrom";
import InfoFacultadPage from "./pages/areas/facultades/InfoFacultadPage";
import InfoAreaSedePage from "./pages/areas/facultades/otras/AreaSedePage";
import FacultadForm from "./pages/areas/facultades/FacultadForm";
import AboutPage from "./pages/about/AboutPage";
import DocentesPage from "./pages/docentes/DocentesPage";
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
              <Route path="/sedes/edit/:id" element={<SedeForm />} />
              <Route path="/sedes/:idSede/facultad/:idFacultad" element={<InfoFacultadPage />} />
              <Route path="/sedes/:idSede/addFacultad" element={<FacultadForm />} />
              <Route path="/sedes/:idSede/editFacultad/:idFacultad" element={<FacultadForm />} />
              <Route path="/area/:id" element={<InfoAreaSedePage />} />
              <Route path="/docentes" element={<DocentesPage />} />
              <Route path="/about" element={<AboutPage />} />
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