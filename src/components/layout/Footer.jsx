import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-6 mt-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-playfair text-xl font-bold">Sabe muito & Sabe pouco</h3>
            <p className="text-sm mt-1 text-gray-300">Sistema de Gestão de Cardápio</p>
          </div>
          
          <div className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Todos os direitos reservados • Iure Silva
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
