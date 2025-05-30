# Sistema de Gestão de Restaurantes - Sabor & Arte

Um sistema moderno para gerenciamento de cardápio de restaurantes, permitindo cadastro, listagem e visualização de pratos com uma experiência visual atraente.

## Funcionalidades

- **Tela Inicial**: Exibe o logo do restaurante e serve como ponto de entrada do sistema.
- **Tela de Cadastro de Prato**: Permite cadastrar um novo prato com todos os detalhes necessários.
- **Tela de Cardápio**: Apresenta todos os pratos cadastrados de forma visualmente organizada, exibindo imagem, nome e preço.

## Tecnologias Utilizadas

- React 19
- React Router DOM
- Tailwind CSS
- Axios para comunicação com API
- Componentes modernos e responsivos

## Estrutura do Projeto

```
src/
├── assets/
│   └── images/
├── components/
│   ├── cardapio/
│   │   ├── FiltroCategorias.jsx
│   │   └── PratoCard.jsx
│   ├── forms/
│   │   └── PratoForm.jsx
│   ├── layout/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── Layout.jsx
│   └── ui/
│       └── MensagemFeedback.jsx
├── hooks/
│   └── useFeedback.js
├── pages/
│   ├── CadastroPrato.jsx
│   ├── Cardapio.jsx
│   └── Home.jsx
├── services/
│   └── api.js
├── utils/
├── App.js
├── index.css
└── index.js
```

## Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o projeto:
   ```
   npm start
   ```
4. Acesse o sistema em `http://localhost:3000`

## Integração com API

O sistema está configurado para se comunicar com a API hospedada no Render. Caso precise alterar a URL da API, edite o arquivo `src/services/api.js`.

## Recursos Visuais

- Design moderno e responsivo
- Experiência visual de cardápio com imagens dos pratos
- Filtros por categoria
- Modal de detalhes dos pratos
- Feedback visual para ações do usuário

## Melhorias Implementadas

- Interface moderna e atraente
- Experiência visual de cardápio com imagens
- Responsividade para todos os dispositivos
- Filtros por categoria de pratos
- Visualização detalhada de cada prato
- Feedback visual para ações do usuário
- Validação de formulários
- Tratamento de erros na comunicação com a API
