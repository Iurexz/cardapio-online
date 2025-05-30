import React from 'react';
import PratoForm from '../components/forms/PratoForm';

const CadastroPrato = () => {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-playfair font-bold text-secondary mb-6 text-center">
        Cadastrar Novo Prato
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Preencha os dados abaixo para adicionar um novo prato ao cardápio
      </p>
      
      <PratoForm />
    </div>
  );
};

export default CadastroPrato;
