import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFeedback from '../../hooks/useFeedback';
import MensagemFeedback from '../ui/MensagemFeedback';
import { pratoService } from '../../services/api';

const PratoForm = () => {
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('DISPONIVEL');
  const [urlImagem, setUrlImagem] = useState('');
  const [previewImagem, setPreviewImagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useFeedback();

  const handleImagemChange = (e) => {
    const url = e.target.value;
    setUrlImagem(url);
    setPreviewImagem(url);
  };

  const formatarPreco = (valor) => {
    // Remove caracteres não numéricos
    const apenasNumeros = valor.replace(/[^\d]/g, '');
    
    // Converte para número e divide por 100 para obter o valor em reais
    const valorNumerico = parseFloat(apenasNumeros) / 100;
    
    // Formata o valor para exibição
    return valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handlePrecoChange = (e) => {
    const valor = e.target.value;
    
    // Remove formatação atual
    const valorSemFormatacao = valor.replace(/[^\d]/g, '');
    
    // Atualiza o estado com o valor formatado
    if (valorSemFormatacao) {
      const valorNumerico = parseFloat(valorSemFormatacao) / 100;
      setPreco(valorNumerico);
    } else {
      setPreco('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nomePrato || !descricao || !preco || !categoria || !disponibilidade || !urlImagem) {
      exibirMensagem('Por favor, preencha todos os campos.', 'erro');
      return;
    }

    const novoPrato = {
      nomePrato,
      descricao,
      preco: parseFloat(preco),
      categoria,
      disponibilidade,
      urlImagem
    };

    setIsLoading(true);

    try {
      await pratoService.cadastrarPrato(novoPrato);
      exibirMensagem('Prato cadastrado com sucesso!', 'sucesso');
      
      // Limpa o formulário
      setNomePrato('');
      setDescricao('');
      setPreco('');
      setCategoria('');
      setDisponibilidade('DISPONIVEL');
      setUrlImagem('');
      setPreviewImagem('');
      
      // Opcional: redirecionar para o cardápio após alguns segundos
      setTimeout(() => {
        navigate('/cardapio');
      }, 2000);
    } catch (error) {
      let mensagemErro = 'Erro ao cadastrar prato. Tente novamente.';
      if (error.response && error.response.data && error.response.data.mensagem) {
        mensagemErro = error.response.data.mensagem;
      }
      exibirMensagem(mensagemErro, 'erro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="nomePrato" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Prato
            </label>
            <input
              type="text"
              id="nomePrato"
              value={nomePrato}
              onChange={(e) => setNomePrato(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Ex: Salada Caesar"
              required
            />
          </div>
          
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Descreva os ingredientes e o preparo do prato..."
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
                value={preco ? formatarPreco(String(preco * 100)) : ''}
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
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
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
                  value="DISPONIVEL"
                  checked={disponibilidade === 'DISPONIVEL'}
                  onChange={(e) => setDisponibilidade(e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="ml-2 text-gray-700">Disponível</span>
              </label>
              
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="ESGOTADO"
                  checked={disponibilidade === 'ESGOTADO'}
                  onChange={(e) => setDisponibilidade(e.target.value)}
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
              value={urlImagem}
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
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            className="btn-primary flex-1 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cadastrando...
              </>
            ) : (
              'Cadastrar Prato'
            )}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/cardapio')}
            className="btn-outline flex-1"
          >
            Cancelar
          </button>
        </div>
      </form>
      
      <MensagemFeedback
        mensagem={mensagem}
        tipo={tipoMensagem}
        visivel={visivel}
        onClose={fecharMensagem}
      />
    </div>
  );
};

export default PratoForm;
