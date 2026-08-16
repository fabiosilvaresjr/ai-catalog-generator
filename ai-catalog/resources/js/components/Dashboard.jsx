import React, { useState, useEffect } from 'react';

export default function Dashboard() {
    // Estados
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect similar ao oninit do Angular
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Get do historico
                const response = await fetch('/api/products');
                if (!response.ok) throw new Error('Erro ao carregar o histórico.');
                
                const data = await response.json();
                setProducts(data); // Salva na memória (useState)
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Desliga o loader
            }
        };

        fetchProducts();
    }, []); // Array vazio

    // Telas de Espera e Erro
    if (loading) return <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>Carregando seu histórico... </div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>{error}</div>;

    // Dashboard
    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Histórico de Catálogos</h2>
            
            {products.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>Nenhum produto gerado ainda.</p>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Layout responsivo
                    gap: '20px', 
                    marginTop: '30px' 
                }}>
                    {/* map para Cartão de cada produto */}
                    {products.map(product => (
                        <div key={product.id} style={{ 
                            border: '1px solid #e0e0e0', 
                            borderRadius: '8px', 
                            padding: '20px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <h3 style={{ margin: 0, color: '#007BFF', fontSize: '18px' }}>{product.name}</h3>
                                <span style={{ 
                                    backgroundColor: '#e9ecef', 
                                    padding: '4px 10px', 
                                    borderRadius: '12px', 
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    color: '#495057'
                                }}>
                                    {product.category}
                                </span>
                            </div>
                            
                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px', fontStyle: 'italic' }}>
                                "{product.base_description}"
                            </p>
                            
                            <div style={{ 
                                fontSize: '14px', 
                                color: '#333', 
                                whiteSpace: 'pre-wrap', 
                                backgroundColor: '#f8f9fa',
                                padding: '10px',
                                borderRadius: '4px',
                                flexGrow: 1, // Faz a caixa crescer para empurrar o resto pra baixo
                                maxHeight: '200px', 
                                overflowY: 'auto' // barra de rolagem para texto grande
                            }}>
                                {product.ai_generated_catalog}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}