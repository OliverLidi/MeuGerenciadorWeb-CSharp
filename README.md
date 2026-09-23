# 📊 MeuGerenciadorWeb — Sistema de Gestão de Estoque & Vendas

Um sistema web moderno e responsivo para controle de estoque e monitoramento de vendas em tempo real, desenvolvido com **C#** e **Blazor (.NET)**.

---

## 🚀 Funcionalidades

- **Dashboard Financeiro:** Indicadores do total de itens, valor total acumulado no estoque e variedade de produtos cadastrados.
- **Gestão de Produtos (CRUD completo):**
  - Cadastramento de novos produtos com validação de preço e quantidade.
  - Alteração rápida de estoque (botões de incremento `+` e decremento `-`).
  - Remoção de itens da lista.
- **Filtro & Busca Dinâmica:** Pesquisa instantânea de produtos pelo nome.
- **Relatório de Vendas:** Visualização do histórico de vendas e faturamento do período.
- **Interatividade em Tempo Real:** Interface reativa utilizando `InteractiveServer` do Blazor.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** C# (.NET)
- **Framework Web:** Blazor (Server Components)
- **Interface & Estilização:** HTML5, CSS3, Bootstrap 5
- **Ferramentas:** Visual Studio Code, Git & GitHub

---

## 📂 Estrutura do Projeto

```text
MeuGerenciadorWeb/
├── Components/
│   ├── Layout/
│   │   └── NavMenu.razor       # Menu de navegação lateral
│   └── Pages/
│       ├── Home.razor          # Painel principal e controle de estoque
│       └── Weather.razor       # Relatório de vendas
├── Produto.cs                  # Modelo de dados da aplicação
├── Program.cs                  # Configuração dos serviços Blazor
└── MeuGerenciadorWeb.csproj    # Arquivo de projeto .NET
🔧 Como Executar o Projeto Localmente
Pré-requisitos:

Possuir o .NET SDK instalado na máquina.

Clonar o repositório:

Bash
git clone [https://github.com/SEU-USUARIO/MeuGerenciadorWeb.git](https://github.com/SEU-USUARIO/MeuGerenciadorWeb.git)
Navegar até a pasta do projeto:

Bash
cd MeuGerenciadorWeb
Executar a aplicação:

Bash
dotnet run
Abra o navegador e acesse o endereço informado no terminal (ex: http://localhost:5204).