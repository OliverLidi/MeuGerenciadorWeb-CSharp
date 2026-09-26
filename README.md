$readmeContent = @'
# 📊 Gerenciador de Estoque & Vendas (.NET & React)

Um sistema web moderno, seguro e responsivo para controle de estoque e monitoramento de produtos, desenvolvido com uma arquitetura Full-Stack separada (**React Vite** no front-end e **.NET Minimal API** no back-end com autenticação **JWT** e base de dados **SQLite**).

## 🚀 Funcionalidades

- **Autenticação Segura (JWT):** Sistema de login protegido (`admin` / `123456`) que gera tokens validados pelo back-end para acesso às rotas privadas.
- **Gestão de Produtos (CRUD Completo):**
  - Cadastramento de novos produtos com validação de preço, quantidade em estoque e status.
  - Edição de produtos existentes diretamente pela interface.
  - Exclusão de itens da base de dados.
- **Filtro & Busca Dinâmica:** Pesquisa instantânea de produtos pelo nome.
- **Indicadores em Tempo Real:** Visualização dinâmica do total de produtos encontrados no sistema.

## 🛠️ Tecnologias Utilizadas

- **Back-end:** C# (.NET Minimal API), Entity Framework Core, SQLite, JWT (JSON Web Tokens)
- **Front-end:** React, Vite, JavaScript (JSX), CSS moderno
- **Controle de Versão:** Git e GitHub

## 📂 Estrutura do Projeto

MeuGerenciadorWeb/
├── frontend/                   # Aplicação React (Vite)
│   ├── src/
│   │   ├── App.jsx             # Componente principal e gestor de produtos
│   │   ├── Login.jsx           # Ecrã de autenticação
│   │   └── main.jsx            # Ponto de entrada React
│   └── package.json
├── Program.cs                  # Configuração da API .NET e rotas protegidas
├── AppDbContext.cs             # Contexto da Base de Dados SQLite
└── MeuGerenciadorWeb.csproj    # Arquivo de projeto .NET

## 🔧 Como Executar o Projeto Localmente

### 1. Pré-requisitos
- Possuir o **.NET SDK** e o **Node.js** instalados na máquina.

### 2. Clonar o repositório
```bash
git clone [https://github.com/OliverLidi/MeuGerenciadorWeb-CSharp.git](https://github.com/OliverLidi/MeuGerenciadorWeb-CSharp.git)
cd MeuGerenciadorWeb
cd MeuGerenciadorWeb
Executar a aplicação:

Bash
dotnet run
Abra o navegador e acesse o endereço informado no terminal (ex: http://localhost:5204).
