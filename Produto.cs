namespace MeuGerenciadorWeb;

public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Categoria { get; set; } = "Geral";
    public decimal PrecoCusto { get; set; }
    public decimal PrecoVenda { get; set; }
    public int QuantidadeEstoque { get; set; }
    public decimal ValorTotal => PrecoVenda * QuantidadeEstoque;
    public DateTime DataCriacao { get; set; } = DateTime.Now;
    public bool Ativo { get; set; } = true;
}
