import React, { useState, useEffect } from 'react';
import { pratoService } from '../services/api';
import PratoCard from '../components/cardapio/PratoCard';
import FiltroCategorias from '../components/cardapio/FiltroCategorias';
import MensagemFeedback from '../components/ui/MensagemFeedback';
import useFeedback from '../hooks/useFeedback';
import FormularioEdicaoPrato from '../components/forms/FormularioEdicaoPrato';

const Cardapio = () => {
  const [pratos, setPratos] = useState([]);
  const [pratosFiltrados, setPratosFiltrados] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [pratoSelecionado, setPratoSelecionado] = useState(null);
  const [pratoParaEditar, setPratoParaEditar] = useState(null);
  const [pratoParaExcluir, setPratoParaExcluir] = useState(null);
  const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useFeedback();

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

  // Mapeamento de disponibilidade para exibição visual
  const getDisponibilidadeDisplay = (disponibilidade) => {
    switch(disponibilidade) {
      case 'DISPONIVEL': return 'Disponível';
      case 'ESGOTADO': return 'Produto Indisponível no momento';
      default: return disponibilidade;
    }
  };

  // Carregar pratos da API - apenas uma vez na montagem do componente
  useEffect(() => {
    const carregarPratos = async () => {
      try {
        setIsLoading(true);
        const data = await pratoService.listarPratos();
        setPratos(data);
        setPratosFiltrados(data);
      } catch (error) {
        console.error('Erro ao carregar pratos:', error);
        exibirMensagem('Não foi possível carregar o cardápio. Tente novamente mais tarde.', 'erro');
        // Sem dados de teste - apenas mostra o cardápio vazio
        setPratos([]);
        setPratosFiltrados([]);
      } finally {
        setIsLoading(false);
      }
    };

    carregarPratos();
  }, []); // Array de dependências vazio para executar apenas uma vez

  // Filtrar pratos por categoria
  useEffect(() => {
    if (categoriaAtiva === 'todas') {
      setPratosFiltrados(pratos);
    } else {
      setPratosFiltrados(pratos.filter(prato => prato.categoria === categoriaAtiva));
    }
  }, [categoriaAtiva, pratos]);

  // Abrir modal de detalhes do prato
  const abrirDetalhesPrato = (prato) => {
    setPratoSelecionado(prato);
  };

  // Fechar modal de detalhes do prato
  const fecharDetalhesPrato = () => {
    setPratoSelecionado(null);
  };

  // Abrir modal de edição
  const editarPrato = (prato) => {
    setPratoParaEditar({...prato}); // Clone para evitar edição direta
    fecharDetalhesPrato(); // Fechar o modal de detalhes
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setPratoParaEditar(null);
  };

  // Salvar alterações do prato
  const salvarEdicaoPrato = async (pratoEditado) => {
    try {
      setIsLoading(true);
      const pratoAtualizado = await pratoService.atualizarPrato(pratoEditado.id, pratoEditado);
      
      // Atualizar a lista de pratos após a edição
      setPratos(pratos.map(prato => 
        prato.id === pratoAtualizado.id ? pratoAtualizado : prato
      ));
      
      setPratoParaEditar(null);
      exibirMensagem('Prato atualizado com sucesso!', 'sucesso');
    } catch (error) {
      console.error('Erro ao atualizar prato:', error);
      exibirMensagem('Erro ao atualizar prato. Tente novamente.', 'erro');
    } finally {
      setIsLoading(false);
    }
  };

  // Abrir modal de confirmação de exclusão
  const confirmarExclusao = (prato) => {
    setPratoParaExcluir(prato);
    fecharDetalhesPrato(); // Fechar o modal de detalhes
  };

  // Cancelar exclusão
  const cancelarExclusao = () => {
    setPratoParaExcluir(null);
  };

  // Excluir prato
  const excluirPrato = async (id) => {
    try {
      setIsLoading(true);
      await pratoService.excluirPrato(id);
      
      // Atualizar a lista de pratos após a exclusão
      setPratos(pratos.filter(prato => prato.id !== id));
      setPratoParaExcluir(null);
      
      exibirMensagem('Prato excluído com sucesso!', 'sucesso');
    } catch (error) {
      console.error('Erro ao excluir prato:', error);
      exibirMensagem('Erro ao excluir prato. Tente novamente.', 'erro');
    } finally {
      setIsLoading(false);
    }
  };

  // Formatar preço para exibição
  const formatarPreco = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
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

  // Mapeamento de cores para disponibilidade
  const getDisponibilidadeColor = (disponibilidade) => {
    switch(disponibilidade) {
      case 'DISPONIVEL': 
        return 'bg-green-100 text-green-800';
      case 'ESGOTADO': 
        return 'bg-red-100 text-red-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl md:text-4xl font-playfair font-bold text-secondary mb-6 text-center">
        Nosso Cardápio
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Conheça nossas deliciosas opções preparadas com ingredientes selecionados
      </p>
      
      <FiltroCategorias 
        categoriaAtiva={categoriaAtiva} 
        setCategoriaAtiva={setCategoriaAtiva} 
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : pratosFiltrados.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">
            Nenhum prato encontrado nesta categoria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pratosFiltrados.map(prato => (
            <PratoCard 
              key={prato.id} 
              prato={prato} 
              onClick={abrirDetalhesPrato} 
            />
          ))}
        </div>
      )}
      
      {/* Modal de detalhes do prato */}
      {pratoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={pratoSelecionado.urlImagem} 
                alt={pratoSelecionado.nomePrato}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/800x400?text=Imagem+Indisponível";
                }}
              />
              <button 
                onClick={fecharDetalhesPrato}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-2 left-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getCategoriaColor(pratoSelecionado.categoria)} text-white`}>
                  {getCategoriaDisplay(pratoSelecionado.categoria)}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-playfair font-bold text-secondary">
                  {pratoSelecionado.nomePrato}
                </h2>
                <span className="text-2xl font-bold text-primary">
                  {formatarPreco(pratoSelecionado.preco)}
                </span>
              </div>
              
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${getDisponibilidadeColor(pratoSelecionado.disponibilidade)}`}>
                  {getDisponibilidadeDisplay(pratoSelecionado.disponibilidade)}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Descrição</h3>
                <p className="text-gray-600">
                  {pratoSelecionado.descricao}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={fecharDetalhesPrato}
                  className="btn-primary flex-1"
                >
                  Fechar
                </button>
                
                <button 
                  onClick={() => editarPrato(pratoSelecionado)}
                  className="btn-outline flex-1"
                >
                  Editar
                </button>
                
                <button 
                  onClick={() => confirmarExclusao(pratoSelecionado)}
                  className="btn-danger flex-1"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de edição de prato */}
      {pratoParaEditar && (
        <FormularioEdicaoPrato
          prato={pratoParaEditar}
          onSave={salvarEdicaoPrato}
          onCancel={cancelarEdicao}
          isLoading={isLoading}
        />
      )}
      
      {/* Modal de confirmação de exclusão */}
      {pratoParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmar Exclusão</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o prato "{pratoParaExcluir.nomePrato}"? Esta ação não pode ser desfeita.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={cancelarExclusao}
                className="btn-outline flex-1"
              >
                Cancelar
              </button>
              <button 
                onClick={() => excluirPrato(pratoParaExcluir.id)}
                className="btn-danger flex-1"
                disabled={isLoading}
              >
                {isLoading ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <MensagemFeedback
        mensagem={mensagem}
        tipo={tipoMensagem}
        visivel={visivel}
        onClose={fecharMensagem}
      />
    </div>
  );
};

export default Cardapio;
