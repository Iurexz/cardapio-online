import React from 'react';

const FiltroCategorias = ({ categoriaAtiva, setCategoriaAtiva }) => {
  const categorias = [
    { id: 'todas', nome: 'Todas' },
    { id: 'SIMPLES', nome: 'Simples' },
    { id: 'JANTAR', nome: 'Jantar' },
    { id: 'PRATOFEITO', nome: 'Prato Feito' },
    { id: 'BEBIDA', nome: 'Bebidas' },
    { id: 'SOBREMESA', nome: 'Sobremesas' }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-2">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setCategoriaAtiva(categoria.id)}
            className={`px-4 py-2 rounded-full transition-all ${
              categoriaAtiva === categoria.id
                ? 'bg-primary text-white font-medium'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {categoria.nome}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltroCategorias;
