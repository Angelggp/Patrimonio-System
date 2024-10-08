import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Plus } from 'lucide-react'
// import useAuthStore from '../stores/AuthStore'
import useDocentesStore from "../../stores/useDocentesStore";

const DocentesPage = () => {
    // const { isLoggedIn } = useAuthStore()
    const { docentes, fetchDocentes } = useDocentesStore();
    // const navigate = useNavigate()

   

    useEffect(() => {
        
        fetchDocentes();
    }, [fetchDocentes]);

    // const handleAddDocente = async () => {
    //     navigate('/docentes/add')
    // }
    return (
        <div className="container mx-auto mt-16 p-4">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold">Docentes</h1>
                {/* {isLoggedIn && (
                <button
                    onClick={handleAddDocente}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-md flex items-center transition duration-300"
                >
                    <Plus className="mr-2" size={20} />
                    Agregar Sede
                </button>
                )} */}
            </div>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">CI</th>
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Apellidos</th>
                        <th className="border border-gray-300 p-2">Teléfono</th>
                        <th className="border border-gray-300 p-2">Correo</th>
                        <th className="border border-gray-300 p-2">Fecha Alta</th>
                        <th className="border border-gray-300 p-2">Fecha Baja</th>
                        <th className="border border-gray-300 p-2">Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.map(docente => (
                        <tr key={docente.id}>
                            <td className="border border-gray-300 p-2">{docente.ci}</td>
                            <td className="border border-gray-300 p-2">{docente.nombre_docente}</td>
                            <td className="border border-gray-300 p-2">{docente.apellido_docente}</td>
                            <td className="border border-gray-300 p-2">{docente.telefono}</td>
                            <td className="border border-gray-300 p-2">{docente.correo}</td>
                            <td className="border border-gray-300 p-2">{docente.fecha_alta}</td>
                            <td className="border border-gray-300 p-2">{docente.fecha_baja}</td>
                            <td className="border border-gray-300 p-2">{docente.cargo.nombre_cargo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocentesPage;