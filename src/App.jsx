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
import InfoSede from "./pages/SedeInfo";
import SedeForm from "./pages/SedeFrom";
import DocentesPage from "./pages/DocentesPage";
import DocentesAdd from "./pages/DocentesAdd";
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
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/homepage" />} />
              <Route path="/docentes" element={<DocentesPage  />} />
              <Route path="/docentes/add" element={<DocentesAdd />} />
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