import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function CatalogForm() {
    // Estados
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        base_description: ''
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [editableText, setEditableText] = useState('');
    const [copied, setCopied] = useState(false);

    // Handlers 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setCopied(false);

        const toastId = toast.loading('A IA está escrevendo sua copy...');

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
                throw new Error(data.message || 'Erro ao processar a requisição.');
            }

            setResult(data.dados);
            setEditableText(data.dados.ai_generated_catalog);
            setFormData({ name: '', category: '', base_description: '' });

            toast.success('Catálogo gerado com sucesso!', { id: toastId });

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(editableText);
        setCopied(true);
        toast.success('Texto copiado para a área de transferência!');
        setTimeout(() => setCopied(false), 2000); 
    };

    //  HTML
    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>Gerador de Catálogo IA</h1>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Nome do Produto:</label>
                    <input 
                        type="text" name="name" value={formData.name} onChange={handleChange} required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Categoria:</label>
                    <input 
                        type="text" name="category" value={formData.category} onChange={handleChange} required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Características Básicas:</label>
                    <textarea 
                        name="base_description" value={formData.base_description} onChange={handleChange} required rows="4"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                    />
                </div>

                <button 
                    type="submit" disabled={loading}
                    style={{ 
                        padding: '12px', backgroundColor: loading ? '#ccc' : '#007BFF', color: '#fff', border: 'none', 
                        borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px'
                    }}
                >
                    {loading ? 'Gerando Marketing... ' : 'Gerar Catálogo'}
                </button>
            </form>

            {result && (
                <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#eefcf5', border: '1px solid #28a745', borderRadius: '4px' }}>
                    <h2 style={{ marginTop: 0, color: '#155724' }}>Catálogo Gerado! ✅</h2>
                    <p><strong>Produto:</strong> {result.name}</p>
                    <p><strong>Categoria:</strong> {result.category}</p>
                    <hr style={{ margin: '15px 0', borderColor: '#c3e6cb' }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ color: '#155724', margin: 0 }}>Descrição Otimizada:</h3>
                        <button 
                            onClick={handleCopy}
                            style={{
                                padding: '6px 12px', backgroundColor: copied ? '#28a745' : '#6c757d', color: '#fff',
                                border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s'
                            }}
                        >
                            {copied ? 'Copiado! ✓' : 'Copiar Texto'}
                        </button>
                    </div>

                    <textarea 
                        value={editableText} onChange={(e) => setEditableText(e.target.value)} rows="12"
                        style={{ width: '100%', padding: '10px', border: '1px solid #28a745', borderRadius: '4px', resize: 'vertical', fontFamily: 'inherit', fontSize: '15px', lineHeight: '1.6', color: '#333' }}
                    />
                </div>
            )}
        </div>
    );
}