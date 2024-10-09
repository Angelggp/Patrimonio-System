import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addAreaSede,
  getAreaSedeById,
  editAreaSede,
  getTipoAreaSede
} from "../../../../api/areas.api"; // Asegúrate de que esta función esté bien definida
import ArrowLeftButton from "../../../../components/ArrowLeftButtom";
import { toast } from "react-hot-toast";

const AreaSedeForm = () => {
  const { idSede, idAreaSede } = useParams();
  const navigate = useNavigate();

  const initialFormData = {
    nombre_area: "",
    descripcion: "",
    tipo_area: null // Asumimos que este será un ID o un valor relacionado
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tipoArea, setTipoArea] = useState([]);

  console.log(tipoArea)

  useEffect(() => {
    const fetchTipoArea = async () => {
      const tipo = await getTipoAreaSede();
      setTipoArea(tipo)
    };

    const fetchAreaSede = async () => {
      if (idAreaSede) {
        try {
          const areaSedeData = await getAreaSedeById(idAreaSede);
          setFormData(areaSedeData);
        } catch (error) {
          console.error("Error al cargar los datos del área de sede:", error);
          toast.error("Error al cargar los datos del área de sede.", {
            position: "bottom-right"
          });
        }
      }
    };

    fetchTipoArea();
    fetchAreaSede();
    window.scrollTo(0, 0);
  }, [idAreaSede]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (idAreaSede) {
        await editAreaSede(idAreaSede, { sede: idSede, ...formData });
        toast.success(
          `El área ${formData.nombre_area} se actualizó correctamente en el sistema!!`,
          {
            position: "bottom-right"
          }
        );
      } else {
        await addAreaSede({ sede: idSede, ...formData });
        toast.success(
          `El área ${formData.nombre_area} se agregó correctamente al sistema!!`,
          {
            position: "bottom-right"
          }
        );
      }

      setFormData(initialFormData); // Limpia el formulario
      navigate(`/sedes/${idSede}`); // Redirige a la ruta deseada
    } catch (error) {
      console.error("Error al guardar el área de sede:", error.message);
      toast.error(
        "Error al guardar el área de sede. Asegúrate de que todos los campos estén llenos.",
        {
          position: "bottom-right"
        }
      );
    }
  };

  const handleReturn = () => {
    navigate(`/sedes/${idSede}`);
  };

  // Clases para estilos
  const inputClasses =
    "mt-1 block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
  const labelClasses = "block text-md font-bold text-gray-600";

  return (
    <div className="flex-grow container mx-auto px-4 py-12 relative z-10 mt-16">
      <ArrowLeftButton handleReturn={handleReturn} text={"Volver a la Sede"} />
      <div className="max-w-2xl mx-auto p-4 mb-20">
        <h2 className="text-2xl font-bold mb-4">
          {idAreaSede ? "Editar Área de Sede" : "Agregar Nueva Área de Sede"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre_area" className={labelClasses}>
              Nombre del Área
            </label>
            <input
              type="text"
              id="nombre_area"
              name="nombre_area"
              value={formData.nombre_area}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="descripcion" className={labelClasses}>
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div>
            <label htmlFor="tipo_area" className={labelClasses}>
              Tipo de Área
            </label>
            <select
              name="tipo_area"
              value={formData.tipo_area || ""}
              onChange={handleChange}
              className={inputClasses}
              required>
              {/* Aquí deberías mapear los tipos de área disponibles desde tu API */}
              <option value="">Seleccione un tipo de área</option>
              {tipoArea.map(tipo => (
                <option value={tipo.id}>{tipo.nombre_tipo_area}</option>
              ))}
              
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200">
            {idAreaSede ? "Actualizar Área" : "Agregar Área"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AreaSedeForm;
