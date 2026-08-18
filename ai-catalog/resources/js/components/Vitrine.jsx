import React, { useState, useEffect } from 'react';

export default function Vitrine() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) throw new Error('Erro ao carregar a vitrine.');
                
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>Carregando loja...</div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>{error}</div>;

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* Cabeçalho da Loja */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ color: '#2E4032', fontSize: '36px', margin: '0 0 10px 0' }}>Terere_cb 🌿</h1>
                    <p style={{ color: '#666', fontSize: '18px' }}>A tradição do campo direto para a sua garrafa.</p>
                </div>

                {products.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666' }}>Nenhum produto disponível no momento.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                        {products.map(product => (
                            <div key={product.id} style={{ 
                                backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s',
                                display: 'flex', flexDirection: 'column'
                            }}>
                                
                                {/* Placeholder da Imagem com cor temática (Verde Escuro) */}
                                <div style={{ 
                                    height: '220px', backgroundColor: '#2E4032', display: 'flex', 
                                    alignItems: 'center', justifyContent: 'center', color: '#889a8c', fontSize: '50px'
                                }}>
                                    🧉
                                </div>

                                {/* Corpo do Produto */}
                                <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <span style={{ 
                                        color: '#2b6cb0', fontSize: '12px', fontWeight: 'bold', 
                                        textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'
                                    }}>
                                        {product.category}
                                    </span>
                                    
                                    <h3 style={{ margin: '0 0 15px 0', color: '#1a202c', fontSize: '22px' }}>
                                        {product.name}
                                    </h3>
                                    
                                    <div style={{ 
                                        fontSize: '15px', color: '#4a5568', lineHeight: '1.6', 
                                        flexGrow: 1, marginBottom: '20px',
                                        // Truque CSS para cortar o texto se for muito grande (ellipsis)
                                        display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                    }}>
                                        {product.ai_generated_catalog}
                                    </div>

                                    <button style={{ 
                                        width: '100%', padding: '15px', backgroundColor: '#38a169', color: 'white', 
                                        border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', 
                                        cursor: 'pointer', transition: 'background-color 0.3s'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#2f855a'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#38a169'}
                                    >
                                        Adicionar ao Carrinho
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}