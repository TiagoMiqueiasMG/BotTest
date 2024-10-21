import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('blipApiKey', apiKey);
      console.log('Login bem-sucedido!'); 
      navigate('/home'); 
    } catch (error) {
      console.error('Erro ao fazer login: ', error); 
      alert('Erro ao fazer login: ' + error.message); 
    }
  };

  return (
    <div className="login-container">
      <h2>ACESSE O BOT</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <h3>Digite sua chave de API do Blip:</h3>
      <input
        type="text"
        placeholder="Blip API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <div>
        <p>Ainda não tem uma conta? <Link to="/register">Cadastre-se aqui</Link></p>
      </div>
    </div>
  );
};

export default Login;
