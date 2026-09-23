namespace MeuGerenciadorWeb;

public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Quantidade { get; set; } = 1;
    public decimal Preco { get; set; } = 0.00m;

    // Calculado automaticamente
    public decimal ValorTotal => Quantidade * Preco;
}