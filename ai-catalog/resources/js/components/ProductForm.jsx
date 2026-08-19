import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductForm({ onProductCreated }) {
    // Estados
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        features: '' 
    });

    const [loading, setLoading] = useState(false);

    // Handlers 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const toastId = toast.loading('Salvando produto no estoque...');

        try {
            // Salva produto
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensagem || 'Erro ao processar a requisição.');
            }

            toast.success('Produto cadastrado com sucesso!', { id: toastId });
            
            // Limpa o formulário
            setFormData({ name: '', category: '', features: '' });

            // Produto criado output
            if (onProductCreated) {
                onProductCreated(data.dados);
            }

        } catch (err) {
            toast.error(err.message, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#2d3748' }}>Cadastro de Estoque</h1>
            <p style={{ textAlign: 'center', color: '#718096', marginBottom: '30px' }}>
                Cadastre as informações físicas do produto. O marketing será gerado na próxima etapa.
            </p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Nome do Produto:</label>
                    <input 
                        type="text" name="name" value={formData.name} onChange={handleChange} required 
                        placeholder="Ex: Garrafa Térmica Black Erva 2.5L"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Categoria:</label>
                    <input 
                        type="text" name="category" value={formData.category} onChange={handleChange} required 
                        placeholder="Ex: Acessórios"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Características Físicas:</label>
                    <textarea 
                        name="features" value={formData.features} onChange={handleChange} required rows="4"
                        placeholder="Ex: Cor preta fosca, alça reforçada, conserva gelo por 24h..."
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                    />
                </div>

                <button 
                    type="submit" disabled={loading}
                    style={{ 
                        padding: '12px', backgroundColor: loading ? '#ccc' : '#2b6cb0', color: '#fff', border: 'none', 
                        borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px'
                    }}
                >
                    {loading ? 'Salvando...' : 'Salvar e Ir para Marketing ➔'}
                </button>
            </form>
        </div>
    );
}