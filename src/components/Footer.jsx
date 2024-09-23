import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Contacto</h3>
            <p>Email: info@universidad.edu</p>
            <p>Teléfono: (123) 456-7890</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
            <p>Calle Universidad 123</p>
            <p>Ciudad Universitaria, CP 12345</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Facebook</a>
              <a href="#" className="hover:text-gray-300">Twitter</a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Universidad. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer