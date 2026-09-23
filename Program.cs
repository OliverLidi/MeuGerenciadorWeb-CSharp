var builder = WebApplication.CreateBuilder(args);

// Adiciona os serviços do Blazor com suporte a componentes interativos
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseAntiforgery();

app.MapStaticAssets();

// Habilita a renderização de componentes interativos no servidor
app.MapRazorComponents<MeuGerenciadorWeb.Components.App>()
    .AddInteractiveServerRenderMode();

app.Run();