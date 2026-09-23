namespace MeuGerenciadorWeb;

public class ProdutoService
{
    private readonly List<Produto> _produtos = new()
    {
        new Produto { Id = 1, Nome = "Teclado Mecânico", Categoria = "Periféricos", PrecoCusto = 150.00m, PrecoVenda = 299.90m, QuantidadeEstoque = 15 },
        new Produto { Id = 2, Nome = "Mouse Gamer", Categoria = "Periféricos", PrecoCusto = 80.00m, PrecoVenda = 159.90m, QuantidadeEstoque = 25 },
        new Produto { Id = 3, Nome = "Monitor 24''", Categoria = "Monitores", PrecoCusto = 500.00m, PrecoVenda = 899.00m, QuantidadeEstoque = 8 }
    };

    public List<Produto> ObterTodos() => _produtos;

    public Produto? ObterPorId(int id) => _produtos.FirstOrDefault(p => p.Id == id);

    public void Adicionar(Produto produto)
    {
        produto.Id = _produtos.Any() ? _produtos.Max(p => p.Id) + 1 : 1;
        _produtos.Add(produto);
    }
}
