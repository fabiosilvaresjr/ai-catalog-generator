import React from 'react';
import { createRoot } from 'react-dom/client';
import CatalogForm from './components/CatalogForm';

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<CatalogForm />);
}