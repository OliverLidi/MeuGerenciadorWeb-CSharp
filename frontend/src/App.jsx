import React, { useState, useEffect } from 'react';
import Login from './Login';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token_jwt'));
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
  const [status, setStatus] = useState('Novo');
  const [busca, setBusca] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const carregarProdutos = () => {
    if (token) {
      setCarregando(true);
      fetch('http://localhost:5204/api/produtos', {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(async (res) => {
          if (!res.ok) {
            if (res.status === 401) {
              localStorage.removeItem('token_jwt');
              setToken(null);
              throw new Error('Sessão expirada. Faça login novamente.');
            }
            throw new Error('Erro ao carregar os produtos.');
          }
          return res.json();
        })
        .then((dados) => {
          setProdutos(Array.isArray(dados) ? dados : []);
          setCarregando(false);
        })
        .catch((err) => {
          setErro(err.message);
          setCarregando(false);
        });
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, [token]);

  const salvarProduto = async (e) => {
    e.preventDefault();
    setErro('');

    const metodo = editandoId ? 'PUT' : 'POST';
    const url = editandoId 
      ? `http://localhost:5204/api/produtos/${editandoId}` 
      : 'http://localhost:5204/api/produtos';

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          nome,
          preco: parseFloat(preco),
          quantidadeEstoque: parseInt(quantidadeEstoque),
          status
        }),
      });

      if (!resposta.ok) {
        throw new Error('Erro ao salvar o produto.');
      }

      setNome('');
      setPreco('');
      setQuantidadeEstoque('');
      setStatus('Novo');
      setEditandoId(null);
      carregarProdutos();
    } catch (err) {
      setErro(err.message);
    }
  };

  const iniciarEdicao = (p) => {
    setEditandoId(p.id || p.Id);
    setNome(p.nome || p.Nome || '');
    setPreco(p.preco || p.Preco || '');
    setQuantidadeEstoque(p.quantidadeEstoque || p.QuantidadeEstoque || '');
    setStatus(p.status || p.Status || 'Novo');
  };

  const excluirProduto = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const resposta = await fetch(`http://localhost:5204/api/produtos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (!resposta.ok) {
        throw new Error('Erro ao excluir o produto.');
      }
      carregarProdutos();
    } catch (err) {
      setErro(err.message);
    }
  };

  const fazerLogout = () => {
    localStorage.removeItem('token_jwt');
    setToken(null);
  };

  if (!token) {
    return <Login aoLogarComSucesso={() => setToken(localStorage.getItem('token_jwt'))} />;
  }

  const produtosFiltrados = produtos.filter(p => 
    (p.nome || p.Nome || '').toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button onClick={fazerLogout} style={{ padding: '6px 14px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
          Sair (Logout)
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h1 style={{ color: '#007bff', margin: '0 0 5px 0', fontSize: '32px' }}>Gerenciador de Estoque</h1>
        <span style={{ backgroundColor: '#e9ecef', color: '#495057', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
          Júnior Ready Stack (.NET & React)
        </span>
      </div>

      {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

      <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
        <div style={{ flex: 1, borderTop: '4px solid #007bff', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold' }}>Total de Produtos Encontrados</div>
          <div style={{ fontSize: '26px', color: '#007bff', fontWeight: 'bold', marginTop: '5px' }}>{produtos.length}</div>
        </div>
        <div style={{ flex: 1, borderTop: '4px solid #28a745', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold' }}>Página Atual</div>
          <div style={{ fontSize: '26px', color: '#28a745', fontWeight: 'bold', marginTop: '5px' }}>1 de 1</div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e3e6f0', padding: '20px', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#333', marginBottom: '15px', fontSize: '16px' }}>
          ➕ {editandoId ? 'Editar Produto' : 'Cadastrar Novo Produto'}
        </div>
        <form onSubmit={salvarProduto}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <div style={{ flex: 2 }}>
              <label style={{ fontSize: '11px', color: '#6c757d', display: 'block', marginBottom: '4px' }}>Nome</label>
              <input type="text" placeholder="Nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ced4da', borderRadius: '4px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#6c757d', display: 'block', marginBottom: '4px' }}>Preço (R$)</label>
              <input type="number" step="0.01" placeholder="0.00" value={preco} onChange={(e) => setPreco(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ced4da', borderRadius: '4px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#6c757d', display: 'block', marginBottom: '4px' }}>Estoque</label>
              <input type="number" placeholder="Qtd" value={quantidadeEstoque} onChange={(e) => setQuantidadeEstoque(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ced4da', borderRadius: '4px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#6c757d', display: 'block', marginBottom: '4px' }}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#fff' }}>
                <option value="Novo">Novo</option>
                <option value="Usado">Usado</option>
                <option value="Indisponível">Indisponível</option>
              </select>
            </div>
            <div>
              <button type="submit" style={{ padding: '9px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                {editandoId ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </div>
          {editandoId && (
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
              <button type="button" onClick={() => { setEditandoId(null); setNome(''); setPreco(''); setQuantidadeEstoque(''); }} style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer', fontSize: '12px' }}>
                Cancelar Edição
              </button>
            </div>
          )}
        </form>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <input 
          type="text" 
          placeholder="Pesquisar produto por nome..." 
          value={busca} 
          onChange={(e) => setBusca(e.target.value)} 
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ced4da', borderRadius: '4px' }} 
        />
      </div>

      <div style={{ border: '1px solid #dee2e6', borderRadius: '6px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: '#fff', fontSize: '14px' }}>
              <th style={{ padding: '12px 15px' }}>Nome ⌃</th>
              <th style={{ padding: '12px 15px' }}>Preço</th>
              <th style={{ padding: '12px 15px' }}>Estoque</th>
              <th style={{ padding: '12px 15px' }}>Status</th>
              <th style={{ padding: '12px 15px', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {carregando ? (
              <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>A carregar produtos...</td></tr>
            ) : produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((p, index) => (
                <tr key={p.id || index} style={{ borderBottom: '1px solid #dee2e6', backgroundColor: index % 2 === 0 ? '#fff' : '#fdfdfd', fontSize: '14px' }}>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#333' }}>{p.nome || p.Nome}</td>
                  <td style={{ padding: '12px 15px', color: '#333' }}>R$ {p.preco || p.Preco}</td>
                  <td style={{ padding: '12px 15px', color: '#333' }}>{p.quantidadeEstoque || p.QuantidadeEstoque} un</td>
                  <td style={{ padding: '12px 15px', color: '#333' }}>{p.status || p.Status || 'Novo'}</td>
                  <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                    <button onClick={() => iniciarEdicao(p)} style={{ padding: '5px 12px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '6px', fontWeight: 'bold', fontSize: '12px' }}>
                      Editar
                    </button>
                    <button onClick={() => excluirProduto(p.id || p.Id)} style={{ padding: '5px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>Nenhum produto encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
