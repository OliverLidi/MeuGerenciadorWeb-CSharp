using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Chave secreta usada para assinar o token (mantenha segura em ambientes reais)
var chaveSecreta = "minha_chave_secreta_super_segura_12345!";
var key = Encoding.ASCII.GetBytes(chaveSecreta);

// Configuração da Autenticação JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddAuthorization();

// (Mantenha o seu DbContext e CORS existentes...)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=estoque.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("PermitirTudo");
app.UseAuthentication();
app.UseAuthorization();

// Garante que a base de dados é criada
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// 1. NOVA ROTA DE LOGIN (Gera o Token)
app.MapPost("/api/login", (UsuarioDto usuarioDto) =>
{
    // Validação fictícia para exemplo (num projeto real, consultaria a BD)
    if (usuarioDto.Username == "admin" && usuarioDto.Password == "123456")
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, usuarioDto.Username) }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return Results.Ok(new { token = tokenHandler.WriteToken(token) });
    }

    return Results.Unauthorized();
});

// 2. ROTA PROTEGIDA (Exemplo: Apenas utilizadores autenticados podem ver os produtos)
app.MapGet("/api/produtos", async (AppDbContext db) => 
    await db.Produtos.ToListAsync()).RequireAuthorization();

// (Mantenha as suas outras rotas de ID e Post com .RequireAuthorization() se desejar protegê-las...)
app.MapGet("/api/produtos/{id}", async (AppDbContext db, int id) =>
{
    var produto = await db.Produtos.FindAsync(id);
    if (produto is null) return Results.NotFound(new { mensagem = "Produto não encontrado" });
    return Results.Ok(produto);
}).RequireAuthorization();

app.Run();

// DTO para o Login
public record UsuarioDto(string Username, string Password);

// (Mantenha as classes Produto e AppDbContext que já tinha...)
public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public decimal Preco { get; set; }
    public int QuantidadeEstoque { get; set; }
    public string Status { get; set; } = "Novo";
}

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Produto> Produtos => Set<Produto>();
}