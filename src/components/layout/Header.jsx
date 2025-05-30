import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-2xl font-playfair font-bold text-primary mb-4 md:mb-0">
            Sabe muito & Sabe pouco
          </Link>
          
          <nav className="flex space-x-2 md:space-x-6">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md transition-all ${
                location.pathname === '/' 
                  ? 'bg-primary text-white' 
                  : 'text-secondary hover:bg-gray-100'
              }`}
            >
              Início
            </Link>
            <Link 
              to="/cadastro" 
              className={`px-3 py-2 rounded-md transition-all ${
                location.pathname === '/cadastro' 
                  ? 'bg-primary text-white' 
                  : 'text-secondary hover:bg-gray-100'
              }`}
            >
              Cadastrar Prato
            </Link>
            <Link 
              to="/cardapio" 
              className={`px-3 py-2 rounded-md transition-all ${
                location.pathname === '/cardapio' 
                  ? 'bg-primary text-white' 
                  : 'text-secondary hover:bg-gray-100'
              }`}
            >
              Cardápio
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
