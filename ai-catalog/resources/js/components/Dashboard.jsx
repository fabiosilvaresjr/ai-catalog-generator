import React, { useState, useEffect } from 'react';

export default function Dashboard() {
    // Estados
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Deleta produto
    const handleDelete = async (id) => {
        
        const confirmar = window.confirm("Tem certeza que deseja excluir este catálogo?");
        if (!confirmar) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erro ao deletar produto.');

            
            // reorganiza lsita sem o produto deletado
            setProducts(products.filter(product => product.id !== id));

        } catch (err) {
            alert(err.message);
        }
    };

    // Telas de Espera e Erro
    if (loading) return <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>Carregando seu histórico... </div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>{error}</div>;

    // Filtra os produtos 
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Dashboard
    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Histórico de Catálogos </h2>
            
            {/* A NOVA BARRA DE PESQUISA */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', marginTop: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Pesquisar por nome ou categoria..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                        width: '100%', maxWidth: '500px', padding: '12px 20px', 
                        borderRadius: '25px', border: '1px solid #ccc',
                        fontSize: '15px', outline: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                />
            </div>

            {/* quando nao tiver nada */}
            {filteredProducts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>Nenhum produto encontrado na pesquisa.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    
                    {filteredProducts.map(product => (
                        <div key={product.id} style={{ 
                            border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px',
                            backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            display: 'flex', flexDirection: 'column'
                        }}>
                    
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <h3 style={{ margin: 0, color: '#007BFF', fontSize: '18px' }}>{product.name}</h3>
                                
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <span style={{ backgroundColor: '#e9ecef', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', color: '#495057' }}>
                                        {product.category}
                                    </span>
                                    
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        style={{
                                            backgroundColor: '#dc3545', color: '#fff', border: 'none',
                                            borderRadius: '4px', padding: '4px 8px', cursor: 'pointer',
                                            fontSize: '12px', fontWeight: 'bold'
                                        }}
                                        title="Excluir"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            
                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px', fontStyle: 'italic' }}>
                                "{product.base_description}"
                            </p>
                            
                            <div style={{ 
                                fontSize: '14px', color: '#333', whiteSpace: 'pre-wrap', backgroundColor: '#f8f9fa',
                                padding: '10px', borderRadius: '4px', flexGrow: 1, maxHeight: '200px', overflowY: 'auto' 
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