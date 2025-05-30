import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'https://api-at-ncez.onrender.com', // URL da API no Render
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptadores para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Funções para interagir com a API
export const pratoService = {
  // Listar todos os pratos
  listarPratos: async () => {
    try {
      const response = await api.get('/pratos');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar pratos:', error);
      throw error;
    }
  },
  
  // Cadastrar um novo prato
  cadastrarPrato: async (prato) => {
    try {
      const response = await api.post('/pratos', prato);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar prato:', error);
      throw error;
    }
  },
  
  // Obter um prato específico
  obterPrato: async (id) => {
    try {
      const response = await api.get(`/pratos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter prato ${id}:`, error);
      throw error;
    }
  },
  
  // Atualizar um prato existente
  atualizarPrato: async (id, prato) => {
    try {
      const response = await api.put(`/pratos/${id}`, prato);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar prato ${id}:`, error);
      throw error;
    }
  },
  
  // Excluir um prato
  excluirPrato: async (id) => {
    try {
      const response = await api.delete(`/pratos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir prato ${id}:`, error);
      throw error;
    }
  }
};

export default api;
