import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido!');
      navigate('/home'); 
    } catch (error) {
      console.error('Erro ao fazer login: ', error); 
      alert('Erro ao fazer login: ' + error.message); 
    }
  };

  return (
    <div className="login-container">
      <h2>ACESSE</h2>
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
      <div>
        <p>Ainda não tem uma conta? <Link to="/register">Cadastre-se aqui</Link></p>
      </div>
    </div>
  );
};

export default Login;
