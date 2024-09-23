import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Home, University, Building, Book, Image, LogIn, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';


export default function AsideMenu({ isLoggedIn, userName, handleLogout}) {

  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);


  const menuItems = [
    { name: 'Inicio', icon: <Home size={20} />, path: '/homePage' },
    { name: 'Sede', icon: <University size={20} />, path: '/sede' },
    { name: 'Área', icon: <Building size={20} />, subItems: ['Facultades', 'Otras Áreas'] },
    { name: 'Galería', icon: <Image size={20} />, path: '/galeria' },
  ];

  const toggleSubMenu = (itemName) => {
    setOpenSubMenu(openSubMenu === itemName ? null : itemName);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`relative bg-white shadow-md flex flex-col transition-all duration-300 ease-in-out ${isMenuExpanded ? 'w-64' : 'w-16'}`}>
        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <div className="relative group">
                  <Link
                    to={item.path || '#'}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                      !isMenuExpanded && 'justify-center'
                    }`}
                    onClick={() => toggleSubMenu(item.name)}
                    aria-expanded={openSubMenu === item.name}
                  >
                    {item.icon}
                    {isMenuExpanded && <span className="ml-2">{item.name}</span>}
                    {item.subItems && isMenuExpanded && (
                      openSubMenu === item.name ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />
                    )}
                  </Link>
                </div>
                {item.subItems && openSubMenu === item.name && isMenuExpanded && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem}>
                        <Link
                          to={`/${subItem.toLowerCase().replace(' ', '-')}`}
                          className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <Book size={16} className="mr-2" />
                          {subItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          {isLoggedIn ? (
            <div className={`flex items-center ${isMenuExpanded ? 'justify-between' : 'justify-center'} p-2 bg-gray-100 rounded-lg`}>
              {isMenuExpanded && (
                <>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{userName}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              )}
              {!isMenuExpanded && (
                <div className="relative group">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute left-full bottom-0 ml-2 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {userName}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className={`flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
                !isMenuExpanded && 'w-8 h-8'
              }`}
            >
              <LogIn size={20} />
              {isMenuExpanded && <span className="ml-2">Iniciar Sesión</span>}
            </Link>
          )}
        </div>
        <button
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
        >
          {isMenuExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </aside>
    </div>
  );
}