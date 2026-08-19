import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductForm({ onProductCreated }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        features: '' 
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Função centralizada de envio, que recebe a ação desejada
    const submitForm = async (action) => {
        if (!formData.name || !formData.category || !formData.features) {
            toast.error("Preencha todos os campos antes de salvar.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading('Salvando produto no estoque...');

        try {
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
            setFormData({ name: '', category: '', features: '' });

            // Só redireciona se o usuário clicou no botão de ir para a IA
            if (action === 'go_to_ia' && onProductCreated) {
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
            
            {/* Título com fundo e borda */}
            <div style={{ 
                backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', 
                padding: '15px 20px', borderRadius: '8px', marginBottom: '30px'
            }}>
                <h1 style={{ textAlign: 'center', color: '#2d3748', margin: 0, fontSize: '22px' }}>
                    Cadastro de Estoque
                </h1>
                <p style={{ textAlign: 'center', color: '#718096', margin: '10px 0 0 0', fontSize: '14px' }}>
                    Cadastre as informações físicas do produto.
                </p>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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

                {/* Dois botões de ação */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <button 
                        type="button" 
                        onClick={() => submitForm('save_only')} 
                        disabled={loading}
                        style={{ 
                            flex: 1, padding: '12px', backgroundColor: '#edf2f7', color: '#4a5568', 
                            border: '1px solid #cbd5e0', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', 
                            fontWeight: 'bold', fontSize: '15px', transition: 'background-color 0.2s'
                        }}
                    >
                        Apenas Salvar
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={() => submitForm('go_to_ia')} 
                        disabled={loading}
                        style={{ 
                            flex: 1, padding: '12px', backgroundColor: '#2b6cb0', color: '#fff', border: 'none', 
                            borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', 
                            fontWeight: 'bold', fontSize: '15px'
                        }}
                    >
                        Salvar e Ir para IA
                    </button>
                </div>
            </form>
        </div>
    );
}