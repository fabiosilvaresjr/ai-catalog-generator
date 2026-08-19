import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import ProductForm from './components/ProductForm'; 
import Dashboard from './components/Dashboard';
import Vitrine from './components/Vitrine';
import MarketingManager from './components/MarketingManager'; 

function App() {
    // tela aberta
    const [currentScreen, setCurrentScreen] = useState('form'); 
    
    // produto
    const [selectedProductForMarketing, setSelectedProductForMarketing] = useState(null);

    // quando cria o produto
    const handleProductCreated = (novoProduto) => {
        setSelectedProductForMarketing(novoProduto); // novo
        setCurrentScreen('marketing');               // ja cadastrado
    };

    return (
        <div>
            <Toaster position="bottom-right" reverseOrder={false} />

            {/* Barra de Navegação */}
            <nav style={{ 
                backgroundColor: '#1a202c', padding: '0 30px', display: 'flex', 
                justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minHeight: '60px'
            }}>
                
                {/* Lado Esquerdo: Área Administrativa */}
                <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
                    {/* Estoque */}
                    <button 
                        onClick={() => setCurrentScreen('form')}
                        style={{
                            backgroundColor: 'transparent', color: currentScreen === 'form' ? '#63b3ed' : '#a0aec0',
                            border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
                            borderBottom: currentScreen === 'form' ? '3px solid #63b3ed' : '3px solid transparent',
                            padding: '20px 0'
                        }}
                    >
                        Cadastrar Estoque
                    </button>

                    {/* Marketing Automatizado */}
                    <button 
                        onClick={() => setCurrentScreen('marketing')}
                        style={{
                            backgroundColor: 'transparent', color: currentScreen === 'marketing' ? '#d69e2e' : '#a0aec0', // Cor diferente (amarelo) pra destacar a IA
                            border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
                            borderBottom: currentScreen === 'marketing' ? '3px solid #d69e2e' : '3px solid transparent',
                            padding: '20px 0'
                        }}
                    >
                        Marketing Automatizado
                    </button>

                    {/* Dashboard */}
                    <button 
                        onClick={() => setCurrentScreen('dashboard')}
                        style={{
                            backgroundColor: 'transparent', color: currentScreen === 'dashboard' ? '#63b3ed' : '#a0aec0',
                            border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
                            borderBottom: currentScreen === 'dashboard' ? '3px solid #63b3ed' : '3px solid transparent',
                            padding: '20px 0'
                        }}
                    >
                        Painel de Controle
                    </button>
                </div>

                {/* Lado Direito: Acesso à Vitrine */}
                <button 
                    onClick={() => setCurrentScreen('vitrine')}
                    style={{
                        backgroundColor: currentScreen === 'vitrine' ? '#2f855a' : '#38a169', 
                        color: '#fff', border: 'none', borderRadius: '20px', 
                        padding: '8px 20px', fontSize: '14px', fontWeight: 'bold', 
                        cursor: 'pointer', transition: 'background-color 0.3s'
                    }}
                >
                    Minha Loja
                </button>
            </nav>

            {/* Renderização condicional das telas */}
            <main style={{ padding: currentScreen === 'vitrine' ? '0' : '20px' }}>
                {/* Form avisar quando terminar */}
                {currentScreen === 'form' && <ProductForm onProductCreated={handleProductCreated} />}
                
                {/* Os dados do produto para a IA usar */}
                {currentScreen === 'marketing' && <MarketingManager selectedProduct={selectedProductForMarketing} />}
                
                {currentScreen === 'dashboard' && <Dashboard />}
                {currentScreen === 'vitrine' && <Vitrine />}
            </main>
        </div>
    );
}

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}