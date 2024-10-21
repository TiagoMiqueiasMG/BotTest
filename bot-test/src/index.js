import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/login'; 
import Home from './components/Home'; 
import Register from './components/register'; 
import Conversa from './components/Talk';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/contato/:id" element={<Conversa />} /> 
        
      </Routes>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); 
  root.render(<App />); 
} else {
  console.error("Elemento 'root' não encontrado.");
}

export default App;

