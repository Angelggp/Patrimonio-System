// src/components/DocentesAdd.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDocente, getCargos } from '../api/docentes.api'; // Asegúrate de que la ruta sea correcta
import { Docente, Cargo } from '../interfaces/docentes.interfaces'; // Importa las interfaces

const DocentesAdd = () => {
    const [formData, setFormData] = useState<Docente>({
        ci: '',
        nombre_docente: '',
        apellido_docente: '',
        telefono: '',
        correo: '',
        fecha_alta: '',
        fecha_baja: '',
        cargo: { id: -1, nombre_cargo: '', descripcion: '' }, // Inicializa con un objeto vacío
    });

    const [cargos, setCargos] = useState<Cargo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCargos = async () => {
            try {
                const data = await getCargos();
                setCargos(data); // Cargar los cargos desde la API
            } catch (error) {
                console.error("Error al cargar cargos:", error);
            }
        };

        fetchCargos();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCargoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCargoId = parseInt(e.target.value);
        const selectedCargo = cargos.find(cargo => cargo.id === selectedCargoId);

        if (selectedCargo) {
            setFormData({ ...formData, cargo: selectedCargo }); // Asigna el objeto Cargo completo
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Verifica que se haya seleccionado un cargo válido
        if (formData.cargo.id === -1) {
            alert("Por favor selecciona un cargo.");
            return;
        }

        console.log("Datos a enviar:", formData); // Verifica los datos
        try {
            await addDocente(formData);
            navigate('/docentes'); // Redirige a la página de docentes después de agregar
        } catch (error) {
            console.error("Error al agregar docente:", error.response ? error.response.data : error.message);
            const errorMessage = error.response?.data?.message || "Error al agregar docente. Intenta nuevamente.";
            alert(errorMessage); // Muestra el mensaje de error específico
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Agregar Docente</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="ci"
                    placeholder="CI"
                    value={formData.ci}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    name="nombre_docente" 
                    placeholder="Nombre"
                    value={formData.nombre_docente}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    name="apellido_docente" 
                    placeholder="Apellidos"
                    value={formData.apellido_docente} 
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                <input
                    type="date"
                    name="fecha_alta" 
                    placeholder="Fecha Alta"
                    value={formData.fecha_alta}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                <input
                    type="date"
                    name="fecha_baja" 
                    placeholder="Fecha Baja (opcional)"
                    value={formData.fecha_baja}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                {/* Sección para seleccionar el cargo usando un combobox */}
                <div>
                  <label htmlFor="cargo" className="block mb-2">Seleccionar Cargo:</label>
                  <select
                      id="cargo"
                      name="cargo" 
                      value={formData.cargo.id} 
                      onChange={handleCargoChange}
                      className="border p-2 w-full">
                      <option value="-1" disabled>Selecciona un cargo</option>
                      {cargos.map(cargo => (
                          <option key={cargo.id} value={cargo.id}>
                              {cargo.nombre_cargo} {/* Muestra solo el nombre del cargo */}
                          </option>
                      ))}
                  </select>
                  {/* Mensaje de advertencia si no se ha seleccionado un cargo */}
                  {formData.cargo.id === -1 && (
                      <p className="text-red-500 text-sm">Debes seleccionar un cargo.</p>
                  )}
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Agregar Docente
                </button>
            </form>
        </div>
    );
};

export default DocentesAdd;