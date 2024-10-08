import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { addSede, editSede, getSedeById } from '../../api/sedes.api';
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';

const SedeForm = () => {

  const navigate = useNavigate()

  const initialFormData = {
    nombre_sede: '',
    ubicacion: '',
    telefono: '',
    correo: '',
    historia: '',
    descripcion: '',
    imagen: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [imagePreview, setImagePreview] = useState(null);

  const { id } = useParams()

  

  console.log(id, 'id de la sede a editar')

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    
    if (file) {
      setFormData(prev => ({ ...prev, imagen: file }));

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop, 
    accept: 'image/*',
    maxSize: 10485760 // 10MB
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    if (id) {
      const fetchSede = async () => {
        try {
          const sedeData = await getSedeById(id);
          setFormData({
            nombre_sede: sedeData.nombre_sede,
            ubicacion: sedeData.ubicacion,
            telefono: sedeData.telefono,
            correo: sedeData.correo,
            historia: sedeData.historia,
            descripcion: sedeData.descripcion,
          });
          setImagePreview(sedeData.imagen); // Suponiendo que la URL de la imagen está en `sedeData.imagen`
        } catch (error) {
          console.error('Error al cargar los datos de la sede:', error);
          toast.error('Error al cargar los datos de la sede.', {
            position: "bottom-right"
          });
        }
      };

      fetchSede();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSend = new FormData();
  
  // Agrega los datos del formulario a FormData
    Object.entries(formData).forEach(([key, value]) => {
      formToSend.append(key, value);
    });
    
    try {
      if (id) {
        await editSede(id, formToSend); // Llama a la función para actualizar la sede
        navigate('/sedes')
        toast.success(`La Sede ${formData.nombre_sede} se actualizó correctamente en el sistema!!`, {
          position: "bottom-right"
        });
      } else {
        await addSede(formData); // Llama a la función para agregar la sede
        toast.success(`La Sede ${formData.nombre_sede} se agregó correctamente al sistema!!`, {
          position: "bottom-right"
        });
      }

      setFormData(initialFormData);
      setImagePreview(null);
      
    } catch (error) {
      console.error('Error al guardar la sede:', error);
      toast.error('Debe agregar una Imagen de la sede', {
        position: "bottom-right"
      });
    }
  };



  console.log(formData)

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";

  const labelClasses = "block text-md font-bold text-gray-600";

  return (
    <div className="max-w-2xl h-full mx-auto p-4 mt-20 mb-20">
      <h2 className="text-2xl font-bold mb-4">{ id ? 'Editar Sede' : 'Agregar Nueva Sede'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre de la Sede */}
        <div>
          <label htmlFor="nombre_sede" className={labelClasses}>Nombre de Sede</label>
          <input
            type="text"
            id="nombre_sede"
            name="nombre_sede"
            value={formData.nombre_sede}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        {/* Ubicación */}
        <div>
          <label htmlFor="ubicacion" className={labelClasses}>Ubicación</label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="telefono" className={labelClasses}>Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Correo */}
        <div>
          <label htmlFor="correo" className={labelClasses}>Correo</label>
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

        {/* Historia */}
        <div>
          <label htmlFor="historia" className={labelClasses}>Historia</label>
          <textarea
            id="historia"
            name="historia"
            value={formData.historia}
            onChange={handleChange}
            rows="3"
            className={inputClasses}
          ></textarea>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className={labelClasses}>Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            className={inputClasses}
          ></textarea>
        </div>

        {/* Imagen */}
        <div>
          <label className={labelClasses}>Imagen</label>
          <div {...getRootProps()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className={`relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo500 ${imagePreview ? "hidden" : ""}`}
                >
                  <span>Subir un archivo</span>
                  <input {...getInputProps()} id="file-upload" name="file-upload" type="file" className={`sr-only ${imagePreview ? "hidden" : ""}`} />
                </label>
                {!imagePreview && (
                  <p className="pl-1">o arrastrar y soltar</p>
                )}
              </div>
              <p className={`text-xs text-gray500 ${imagePreview ? "hidden" : ""}`}>PNG, JPG, GIF hasta 10MB</p>
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div>
          <button
            type="submit"
            className={`w-full flex justify-center bg-indigo-600 hover:bg-indigo-700 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo600 hover:bg-indigo700 focus:outline-none focus:ring2 focus:ring-offset2 focus:ring-indigo500`}
          >
            Guardar Sede
          </button>
        </div>
      </form>
    </div>
  );
};

export default SedeForm;


