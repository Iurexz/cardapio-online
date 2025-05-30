# API Gerenciamento de Pratos

API REST para gerenciar pratos de um restaurante, desenvolvida em Java.

## 🚀 Como executar

1. Clone o repositório
2. Execute o comando:
   ```bash
   mvn spring-boot:run
   ```
3. A API estará disponível em: `http://localhost:8080`

## 📋 Endpoints

### Listar todos os pratos
```
GET /pratos
```

### Buscar prato por ID
```
GET /pratos/{id}
```

### Criar novo prato
```
POST /pratos
Content-Type: application/json

{
  "id": 1,
  "nomePrato": "Salada Caesar",
  "descricao": "Alface americana, croutons, queijo parmesão e molho caesar.",
  "preco": 29.00,
  "categoria": "Entrada",
  "disponibilidade": "Em estoque",
  "urlImagem": "[https://example.com/imagens/salada-caesar.jpg](https://example.com/imagens/salada-caesar.jpg)"
}

```

### Atualizar prato
```
PUT /pratos/{id}
Content-Type: application/json

{
  "id": 1,
  "nomePrato": "Salada Caesar",
  "descricao": "Alface americana, croutons, queijo parmesão e molho caesar.",
  "preco": 29.00,
  "categoria": "Entrada",
  "disponibilidade": "Em estoque",
  "urlImagem": "[https://example.com/imagens/salada-caesar.jpg](https://example.com/imagens/salada-caesar.jpg)"
} "Prato Principal"
}
```

### Deletar prato
```
DELETE /pratos/{id}
```

## 💾 Banco de Dados

A API utiliza banco H2 em memória para desenvolvimento. Para produção, configure as variáveis de ambiente no `application.properties`.

## 🛠️ Tecnologias

- Java 17+
- Spring Boot
- Spring Data JPA
- H2 Database (desenvolvimento)
- Maven

## 📄 Exemplo de Resposta

```json
{
  "id": 1,
  "nome": "Feijoada",
  "descricao": "Feijoada completa com acompanhamentos",
  "preco": 25.90,
  "categoria": "Prato Principal",
  "dataCriacao": "2024-01-15T10:30:00"
}
```