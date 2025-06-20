import React from 'react';
import ReactDOM from 'react-dom/client';
import QRCodeGenerator from './components/QRCodeGenerator';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QRCodeGenerator />
  </React.StrictMode>
);
