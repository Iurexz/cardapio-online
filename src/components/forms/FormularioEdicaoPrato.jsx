import React, { useState } from 'react';

const FormularioEdicaoPrato = ({ prato, onSave, onCancel, isLoading }) => {
  const [pratoEditado, setPratoEditado] = useState({...prato});
  const [previewImagem, setPreviewImagem] = useState(prato.urlImagem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPratoEditado({
      ...pratoEditado,
      [name]: value
    });
  };

  const handleImagemChange = (e) => {
    const url = e.target.value;
    setPratoEditado({
      ...pratoEditado,
      urlImagem: url
    });
    setPreviewImagem(url);
  };

  const handlePrecoChange = (e) => {
    const valor = e.target.value;
    
    // Remove formatação atual
    const valorSemFormatacao = valor.replace(/[^\d]/g, '');
    
    // Atualiza o estado com o valor formatado
    if (valorSemFormatacao) {
      const valorNumerico = parseFloat(valorSemFormatacao) / 100;
      setPratoEditado({
        ...pratoEditado,
        preco: valorNumerico
      });
    } else {
      setPratoEditado({
        ...pratoEditado,
        preco: ''
      });
    }
  };

  const formatarPreco = (valor) => {
    // Remove caracteres não numéricos
    const apenasNumeros = valor.toString().replace(/[^\d]/g, '');
    
    // Converte para número e divide por 100 para obter o valor em reais
    const valorNumerico = parseFloat(apenasNumeros) / 100;
    
    // Formata o valor para exibição
    return valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(pratoEditado);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Prato</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nomePrato" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Prato
              </label>
              <input
                type="text"
                id="nomePrato"
                name="nomePrato"
                value={pratoEditado.nomePrato}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={pratoEditado.descricao}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
                  Preço (R$)
                </label>
                <input
                  type="text"
                  id="preco"
                  name="preco"
                  value={pratoEditado.preco ? formatarPreco(String(pratoEditado.preco * 100)) : ''}
                  onChange={handlePrecoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="R$ 0,00"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={pratoEditado.categoria}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="SIMPLES">Simples</option>
                  <option value="JANTAR">Jantar</option>
                  <option value="PRATOFEITO">Prato Feito</option>
                  <option value="BEBIDA">Bebida</option>
                  <option value="SOBREMESA">Sobremesa</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disponibilidade
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="disponibilidade"
                    value="DISPONIVEL"
                    checked={pratoEditado.disponibilidade === 'DISPONIVEL'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Disponível</span>
                </label>
                
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="disponibilidade"
                    value="ESGOTADO"
                    checked={pratoEditado.disponibilidade === 'ESGOTADO'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Esgotado</span>
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="urlImagem" className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <input
                type="url"
                id="urlImagem"
                name="urlImagem"
                value={pratoEditado.urlImagem}
                onChange={handleImagemChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="https://exemplo.com/imagem.jpg"
                required
              />
            </div>
            
            {previewImagem && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview da Imagem:</p>
                <div className="border border-gray-300 rounded-md p-2 w-full h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src={previewImagem}
                    alt="Preview do prato"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x300?text=Imagem+Indisponível";
                    }}
                  />
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="btn-outline flex-1"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Salvando...
                  </>
                ) : (
                  'Salvar Alterações'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioEdicaoPrato;
