const AboutPage = () => {
    return (
        <div className="max-w-2xl h-screen mx-auto p-4 mt-20 mb-20">
            <h1 className="text-3xl font-bold mb-4">Acerca de</h1>
            <h2 className="text-xl font-semibold mb-2">Desarrollador</h2>
            <p className="mb-4">Nombre del Desarrollador: Juan Pérez</p>

            <h2 className="text-xl font-semibold mb-2">Descripción del Sistema</h2>
            <p className="mb-4">
                Este sistema de gestión del patrimonio está diseñado para ayudar a las instituciones a administrar y preservar su patrimonio cultural y histórico.            
            </p>

            <h2 className="text-xl font-semibold mb-2">Versión</h2>
            <p>Versión: 1.0.0</p>
        </div>
    );
};

export default AboutPage;