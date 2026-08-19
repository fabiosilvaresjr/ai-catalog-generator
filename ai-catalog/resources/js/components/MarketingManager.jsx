import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function MarketingManager({ selectedProduct }) {
    // Estados do Marketing
    const [promptContext, setPromptContext] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Estados do Resultado
    const [generatedCopy, setGeneratedCopy] = useState(null);
    const [editableText, setEditableText] = useState('');
    const [copied, setCopied] = useState(false);

    // Trocou produto, limpa inputs
    useEffect(() => {
        setGeneratedCopy(null);
        setEditableText('');
        setPromptContext('');
    }, [selectedProduct]);

    // POST 
    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        setLoading(true);
        const toastId = toast.loading('Gerando seu Marketing...');

        try {
            const response = await fetch('/api/marketing-copys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    product_id: selectedProduct.id,
                    target_platform: 'Geral',
                    prompt_context: promptContext
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.mensagem || 'Erro ao gerar Marketing.');

            // Salva o resultado no estado para aparecer na tela
            setGeneratedCopy(data.dados);
            setEditableText(data.dados.ai_generated_text);
            
            toast.success('Marketing gerado com sucesso!', { id: toastId });

        } catch (err) {
            toast.error(err.message, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    // Rota PUT
    const handleSaveEdit = async () => {
        if (!generatedCopy) return;
        const toastId = toast.loading('Salvando alterações...');

        try {
            const response = await fetch(`/api/marketing-copys/${generatedCopy.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ ai_generated_text: editableText })
            });

            if (!response.ok) throw new Error('Erro ao salvar a edição.');

            toast.success('Texto atualizado no banco de dados!', { id: toastId });
        } catch (err) {
            toast.error(err.message, { id: toastId });
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(editableText);
        setCopied(true);
        toast.success('Texto copiado para a área de transferência!');
        setTimeout(() => setCopied(false), 2000); 
    };

    // Se a tela for aberta sem nenhum produto selecionado 
    if (!selectedProduct) {
        return (
            <div style={{ textAlign: 'center', padding: '60px', color: '#718096' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Nenhum Produto Selecionado</h2>
                <p>Volte ao Painel de Controle e selecione um produto do estoque para gerar seu marketing.</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#2d3748' }}>  {selectedProduct.name}</h1>
            
            <div style={{ backgroundColor: '#edf2f7', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#4a5568' }}>
                    <strong>Categoria:</strong> {selectedProduct.category} <br/>
                    <strong>Características Base:</strong> {selectedProduct.features}
                </p>
            </div>
            
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Direcionamento para a IA (Opcional):</label>
                    <textarea 
                        value={promptContext} onChange={(e) => setPromptContext(e.target.value)} rows="3"
                        placeholder="Ex: Focar na promoção de dia dos pais, usar tom divertido, destacar que o frete é grátis..."
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                    />
                </div>

                <button 
                    type="submit" disabled={loading}
                    style={{ 
                        padding: '12px', backgroundColor: loading ? '#ccc' : '#38a169', color: '#fff', border: 'none', 
                        borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px'
                    }}
                >
                    {loading ? 'Pensando... ' : 'Gerar Marketing'}
                </button>
            </form>

            {/* Resultado da IA e Edição */}
            {generatedCopy && (
                <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h3 style={{ color: '#2b6cb0', margin: 0 }}>Resultado Otimizado:</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={handleSaveEdit}
                                style={{ padding: '6px 12px', backgroundColor: '#d69e2e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                💾 Salvar Edição
                            </button>
                            <button 
                                onClick={handleCopy}
                                style={{ padding: '6px 12px', backgroundColor: copied ? '#28a745' : '#4a5568', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                {copied ? 'Copiado! ✓' : '📋 Copiar'}
                            </button>
                        </div>
                    </div>

                    <textarea 
                        value={editableText} onChange={(e) => setEditableText(e.target.value)} rows="12"
                        style={{ width: '100%', padding: '15px', border: '1px solid #cbd5e0', borderRadius: '4px', resize: 'vertical', fontFamily: 'inherit', fontSize: '15px', lineHeight: '1.6', color: '#2d3748', backgroundColor: '#f8fafc' }}
                    />
                </div>
            )}
        </div>
    );
}