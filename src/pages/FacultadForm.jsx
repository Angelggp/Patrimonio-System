import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFacultad } from '../api/facultades.api'; // Asegúrate de que esta función esté bien definida
import useSedesStore from '../stores/useSedesStore';

const AddFacultadForm = () => {
    const [nombreFacultad, setNombreFacultad] = useState('');
    const [sedeId, setSedeId] = useState(''); // Estado para la sede seleccionada
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [numeroAcuerdo, setNumeroAcuerdo] = useState('');
    const [historia, setHistoria] = useState('');
    const [estadoConservacion, setEstadoConservacion] = useState('bueno');
    const [estructura, setEstructura] = useState('');
    const [valores, setValores] = useState('cultural');
    const [descripcion, setDescripcion] = useState('');

    const { sedes } = useSedesStore(); // Obtener las sedes desde el store
    const navigate = useNavigate(); // Hook para redirigir después de agregar

    // Clases para estilos
    const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
    const labelClasses = "block text-md font-bold text-gray-600";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Encuentra la sede seleccionada por su ID
            const selectedSede = sedes.find(sede => sede.id === parseInt(sedeId));

            const data = {
                sede: { 
                    id: selectedSede.id, 
                    nombre_sede: selectedSede.nombre_sede // Incluye el nombre de la sede
                },
                nombre_facultad: nombreFacultad,
                telefono,
                correo,
                numero_acuerdo: numeroAcuerdo,
                historia,
                estado_conservacion: estadoConservacion,
                estructura,
                valores,
                descripcion,
            }

            console.log(data)

            // Llama a la función del módulo API para agregar la facultad
            await addFacultad(data);

            // Limpia el formulario
            setNombreFacultad('');
            setSedeId('');
            setTelefono('');
            setCorreo('');
            setNumeroAcuerdo('');
            setHistoria('');
            setEstadoConservacion('bueno');
            setEstructura('');
            setValores('cultural');
            setDescripcion('');

            // Redirige a otra página si es necesario
            navigate('/facultades'); // Cambia esto a la ruta deseada
        } catch (error) {
            console.error('Error al agregar la facultad:', error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 mt-20 mb-20">
            <h2 className="text-2xl font-bold mb-4">Agregar Nueva Facultad</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={labelClasses}>Sede</label>
                    <select 
                        value={sedeId} 
                        onChange={(e) => setSedeId(e.target.value)} 
                        required 
                        className={inputClasses}
                    >
                        <option value="">Selecciona una sede</option>
                        {sedes && sedes.map((sede) => (
                            <option key={sede.id} value={sede.id}>
                                {sede.nombre_sede}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClasses}>Nombre de la Facultad</label>
                    <input 
                        type="text" 
                        value={nombreFacultad} 
                        onChange={(e) => setNombreFacultad(e.target.value)} 
                        required 
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label className={labelClasses}>Teléfono</label>
                    <input 
                        type="tel" 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)} 
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label className={labelClasses}>Correo Electrónico</label>
                    <input 
                        type="email" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} 
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label className={labelClasses}>Número de Acuerdo</label>
                    <input 
                        type="text" 
                        value={numeroAcuerdo} 
                        onChange={(e) => setNumeroAcuerdo(e.target.value)} 
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label className={labelClasses}>Historia</label>
                    <textarea 
                        value={historia} 
                        onChange={(e) => setHistoria(e.target.value)} 
                        className={`${inputClasses} resize-none`}
                    />
                </div>

                <div>
                    <label className={labelClasses}>Estado de Conservación</label>
                    <select
                        value={estadoConservacion}
                        onChange={(e) => setEstadoConservacion(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="bueno">Bueno</option>
                        <option value="malo">Malo</option>
                        <option value="regular">Regular</option>
                    </select>
                </div>

                <div>
                    <label className={labelClasses}>Estructura</label>
                    <textarea 
                        value={estructura} 
                        onChange={(e) => setEstructura(e.target.value)} 
                        className={`${inputClasses} resize-none`}
                    />
                </div>

                <div>
                    <label className={labelClasses}>Valores</label>
                    <select
                        value={valores}
                        onChange={(e) => setValores(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="cultural">Cultural</option>
                        <option value="historico">Histórico</option>
                        <option value="social">Social</option>
                        <option value="estetico">Estético</option>
                    </select>
                </div>

                <div>
                    <label className={labelClasses}>Descripción</label>
                    <textarea 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        className={`${inputClasses} resize-none`}
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200">
                    Agregar Facultad
                </button>
            </form>
        </div>
    );
};

export default AddFacultadForm;