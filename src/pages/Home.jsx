import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-light">
      <div className="container-custom py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src={require('../assets/images/logo.png')} 
              alt="Logo do Restaurante" 
              className="w-120 h-120 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/200x200?text=Sabor+%26+Arte";
              }}
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-secondary mb-4">
            Sabe muito & Sabe pouco
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Seja Bem-vindo ao nosso sistema de gerenciamento de pratos! Aqui você pode explorar nosso cardápio, cadastrar novos pratos e muito mais.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              to="/cardapio" 
              className="btn-primary text-center py-3 px-8 text-lg"
            >
              Ver Cardápio
            </Link>
            
            <Link 
              to="/cadastro" 
              className="btn-outline text-center py-3 px-8 text-lg"
            >
              Cadastrar Novo Prato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
