// Arquivo para garantir que as fontes sejam carregadas corretamente
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Importando as fontes do Google Fonts via link no head
const linkPlayfair = document.createElement('link');
linkPlayfair.rel = 'stylesheet';
linkPlayfair.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap';
document.head.appendChild(linkPlayfair);

const linkInter = document.createElement('link');
linkInter.rel = 'stylesheet';
linkInter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
document.head.appendChild(linkInter);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
