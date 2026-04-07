# API Gerenciamento de Pratos

API REST para gerenciar pratos de um restaurante, desenvolvida com Java 17 e Spring Boot.

## Como executar

1. Clone o repositório.
2. Execute o projeto com Maven Wrapper:

```bash
./mvnw spring-boot:run
```

No Windows:

```bash
.\mvnw.cmd spring-boot:run
```

3. A API estará disponível em http://localhost:8080.

## Banco de dados

Por padrão, a aplicação sobe com H2 em memória para desenvolvimento local.

Para usar outro banco, configure variáveis de ambiente:

- DB_URL
- DB_USERNAME
- DB_PASSWORD

## Endpoints

### Listar todos os pratos

```http
GET /pratos
```

### Buscar prato por ID

```http
GET /pratos/{id}
```

### Criar novo prato

```http
POST /pratos
Content-Type: application/json

{
  "nomePrato": "Salada Caesar",
  "descricao": "Alface americana, croutons, parmesão e molho caesar.",
  "preco": 29.0,
  "categoria": "SIMPLES",
  "disponibilidade": "DISPONIVEL",
  "urlImagem": "https://example.com/imagens/salada-caesar.jpg"
}
```

### Atualizar prato

```http
PUT /pratos/{id}
Content-Type: application/json

{
  "nomePrato": "Salada Caesar Premium",
  "descricao": "Alface americana, croutons artesanais, parmesão e molho da casa.",
  "preco": 34.9,
  "categoria": "SIMPLES",
  "disponibilidade": "DISPONIVEL",
  "urlImagem": "https://example.com/imagens/salada-caesar-premium.jpg"
}
```

### Remover prato

```http
DELETE /pratos/{id}
```

## Tecnologias

- Java 17
- Spring Boot
- Spring Data JPA
- Bean Validation
- H2 Database
- Maven