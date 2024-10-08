import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addFacultad, getFacultadById, editFacultad } from "../../../api/facultades.api"; // Asegúrate de que esta función esté bien definida
import ArrowLeftButton from "../../../components/ArrowLeftButtom";
import { toast } from "react-hot-toast";

const FacultadForm = () => {
  const { idSede, idFacultad } = useParams();
  const navigate = useNavigate();

  const initialFormData = {
    nombre_facultad: "",
    telefono: "",
    correo: "",
    numero_acuerdo: "",
    historia: "",
    estado_conservacion: "bueno",
    estructura: "",
    valores: "cultural",
    descripcion: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchFacultad = async () => {
      if (idFacultad) {
        try {
          const facultadData = await getFacultadById(idFacultad);
          setFormData(facultadData);
        } catch (error) {
          console.error("Error al cargar los datos de la facultad:", error);
          toast.error("Error al cargar los datos de la facultad.", {
            position: "bottom-right"
          });
        }
      }
    };

    fetchFacultad();
    window.scrollTo(0, 0);
  }, [idFacultad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (idFacultad) {
        await editFacultad(idFacultad, { sede: idSede, ...formData });
        toast.success(`La Facultad ${formData.nombre_facultad} se actualizó correctamente en el sistema!!`, {
          position: "bottom-right"
        });
      } else {
        await addFacultad({ sede: idSede, ...formData });
        toast.success(`La ${formData.nombre_facultad} se agregó correctamente al sistema!!`, {
          position: "bottom-right"
        });
      }

      setFormData(initialFormData); // Limpia el formulario
      navigate(`/sedes/${idSede}`); // Redirige a la ruta deseada
    } catch (error) {
      console.error("Error al guardar la facultad:", error.message);
      toast.error("Error al guardar la facultad. Asegúrate de que todos los campos estén llenos.", {
        position: "bottom-right"
      });
    }
  };

  const handleReturn = () => {
    navigate(`/sedes/${idSede}`);
  };

  // Clases para estilos
  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
  const labelClasses = "block text-md font-bold text-gray-600";

  return (
    <div className="flex-grow container mx-auto px-4 py-12 relative z-10 mt-16">
      <ArrowLeftButton handleReturn={handleReturn} text={"Volver a la Sede"} />
      <div className="max-w-2xl mx-auto p-4 mb-20">
        <h2 className="text-2xl font-bold mb-4">{idFacultad ? 'Editar Facultad' : 'Agregar Nueva Facultad'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre_facultad" className={labelClasses}>
              Nombre de la Facultad
            </label>
            <input
              type="text"
              id="nombre_facultad"
              name="nombre_facultad"
              value={formData.nombre_facultad}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="telefono" className={labelClasses}>
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="correo" className={labelClasses}>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="numero_acuerdo" className={labelClasses}>
              Número de Acuerdo
            </label>
            <input
              type="text"
              id="numero_acuerdo"
              name="numero_acuerdo"
              value={formData.numero_acuerdo}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="historia" className={labelClasses}>
              Historia
            </label>
            <textarea
              id="historia"
              name="historia"
              value={formData.historia}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div>
            <label className={labelClasses}>Estado de Conservación</label>
            <select
              name="estado_conservacion"
              value={formData.estado_conservacion}
              onChange={handleChange}
              className={inputClasses}>
              <option value="bueno">Bueno</option>
              <option value="malo">Malo</option>
              <option value="regular">Regular</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Estructura</label>
            <textarea
              name="estructura"
              value={formData.estructura}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div>
            <label className={labelClasses}>Valores</label>
            <select
              name="valores"
              value={formData.valores}
              onChange={handleChange}
              className={inputClasses}>
              <option value="cultural">Cultural</option>
              <option value="historico">Histórico</option>
              <option value="social">Social</option>
              <option value="estetico">Estético</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200">
            {idFacultad ? 'Actualizar Facultad' : 'Agregar Facultad'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultadForm;