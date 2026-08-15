import React, { useState } from 'react';

export default function CatalogForm() {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        base_description: ''
    });

    // estados de controle de tela
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Atualiza os dados do formulário conforme o usuário digita
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Função disparada ao clicar no botão de enviar
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Post
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // Avisa o Laravel que somos uma API
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao processar a requisição.');
            }

            // salva dados
            setResult(data.dados);
            
            // Limpa o formulário
            setFormData({ name: '', category: '', base_description: '' });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Para o loader independentemente de dar erro ou sucesso
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>Gerador de Catálogo IA </h1>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <div>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Nome do Produto:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Categoria:</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Características Básicas:</label>
                    <textarea 
                        name="base_description" 
                        value={formData.base_description} 
                        onChange={handleChange} 
                        required 
                        rows="4"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        padding: '12px', 
                        backgroundColor: loading ? '#ccc' : '#007BFF', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginTop: '10px'
                    }}
                >
                    {loading ? 'Gerando texto... ⏳' : 'Gerar Catálogo'}
                </button>
            </form>

            {error && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ffe6e6', color: '#d9534f', borderRadius: '4px' }}>
                    <strong>Erro:</strong> {error}
                </div>
            )}

            {result && (
                <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#eefcf5', border: '1px solid #28a745', borderRadius: '4px' }}>
                    <h2 style={{ marginTop: 0, color: '#155724' }}>Catálogo Gerado com Sucesso! ✅</h2>
                    <p><strong>Produto:</strong> {result.name}</p>
                    <p><strong>Categoria:</strong> {result.category}</p>
                    <hr style={{ margin: '15px 0', borderColor: '#c3e6cb' }} />
                    <h3 style={{ color: '#155724' }}>Descrição Otimizada:</h3>
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#333' }}>{result.ai_generated_catalog}</p>
                </div>
            )}
        </div>
    );
}