import React from 'react';

const PratoCard = ({ prato, onClick }) => {
  const { nomePrato, preco, categoria, disponibilidade, urlImagem } = prato;
  
  const formatarPreco = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Mapeamento de categorias para exibição visual
  const getCategoriaDisplay = (categoria) => {
    switch(categoria) {
      case 'SIMPLES': return 'Simples';
      case 'JANTAR': return 'Jantar';
      case 'PRATOFEITO': return 'Prato Feito';
      case 'BEBIDA': return 'Bebida';
      case 'SOBREMESA': return 'Sobremesa';
      default: return categoria;
    }
  };

  // Mapeamento de cores para categorias
  const getCategoriaColor = (categoria) => {
    switch(categoria) {
      case 'SIMPLES': return 'bg-blue-500';
      case 'JANTAR': return 'bg-primary';
      case 'PRATOFEITO': return 'bg-yellow-500';
      case 'BEBIDA': return 'bg-green-500';
      case 'SOBREMESA': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Verificar se o prato está esgotado
  const isEsgotado = disponibilidade === 'ESGOTADO';
  
  return (
    <div 
      className={`card cursor-pointer transform transition-all duration-300 hover:-translate-y-1 ${
        isEsgotado ? 'opacity-70' : ''
      }`}
      onClick={() => onClick(prato)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={urlImagem} 
          alt={nomePrato}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x300?text=Imagem+Indisponível";
          }}
        />
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${getCategoriaColor(categoria)} text-white`}>
            {getCategoriaDisplay(categoria)}
          </span>
        </div>
        
        {isEsgotado && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-danger text-white px-3 py-1 rounded-md font-bold transform -rotate-12">
              Esgotado
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-playfair font-bold text-lg text-secondary mb-1 line-clamp-1">
          {nomePrato}
        </h3>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-primary">
            {formatarPreco(preco)}
          </span>
          
          <button className="text-sm text-secondary hover:text-primary transition-colors">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PratoCard;
