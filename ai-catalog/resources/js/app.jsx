import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import CatalogForm from './components/CatalogForm';
import Dashboard from './components/Dashboard';

function App() {
    // Estado para controlar qual tela está ativa
    const [currentScreen, setCurrentScreen] = useState('form');

    return (
        <div>
            <Toaster position="bottom-right" reverseOrder={false} />
            {/* Barra de Navegação */}
            <nav style={{ 
                backgroundColor: '#333', 
                padding: '15px 30px', 
                display: 'flex', 
                gap: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <button 
                    onClick={() => setCurrentScreen('form')}
                    style={{
                        backgroundColor: 'transparent',
                        color: currentScreen === 'form' ? '#4dabf7' : '#fff',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        borderBottom: currentScreen === 'form' ? '2px solid #4dabf7' : 'none'
                    }}
                >
                    + Novo Catálogo
                </button>
                <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    style={{
                        backgroundColor: 'transparent',
                        color: currentScreen === 'dashboard' ? '#4dabf7' : '#fff',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        borderBottom: currentScreen === 'dashboard' ? '2px solid #4dabf7' : 'none'
                    }}
                >
                    📋 Meu Histórico
                </button>
            </nav>

            {/* O "Corpo" da Aplicação: Renderiza a tela baseada no botão clicado */}
            <main style={{ padding: '20px' }}>
                {currentScreen === 'form' ? <CatalogForm /> : <Dashboard />}
            </main>
        </div>
    );
}

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}