import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import CatalogForm from './components/CatalogForm';
import Dashboard from './components/Dashboard';
import Vitrine from './components/Vitrine';

function App() {
    // 3 estados: 'form', 'dashboard' ou 'vitrine'
    const [currentScreen, setCurrentScreen] = useState('vitrine'); //tela inicial

    return (
        <div>
            <Toaster position="bottom-right" reverseOrder={false} />

            {/* Barra de Navegação */}
            <nav style={{ 
                backgroundColor: '#1a202c', 
                padding: '0 30px', 
                display: 'flex', 
                justifyContent: 'space-between', // Separa a esquerda da direita
                alignItems: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                minHeight: '60px'
            }}>
                
                {/* Lado Esquerdo: Área Administrativa */}
                <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
                    <button 
                        onClick={() => setCurrentScreen('form')}
                        style={{
                            backgroundColor: 'transparent', color: currentScreen === 'form' ? '#63b3ed' : '#a0aec0',
                            border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
                            borderBottom: currentScreen === 'form' ? '3px solid #63b3ed' : '3px solid transparent',
                            padding: '20px 0'
                        }}
                    >
                        Gerador de marketing
                    </button>
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

            {/* Renderização condicional das 3 telas */}
            <main style={{ padding: currentScreen === 'vitrine' ? '0' : '20px' }}>
                {currentScreen === 'form' && <CatalogForm />}
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