import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; 
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const db = getFirestore(); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      // Cria o usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Grava os dados no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
      });

      // Exibe sucesso e redireciona para login
      setSuccess(true);
      alert('Usuário cadastrado com sucesso!');
      navigate('/login');
      
    } catch (err) {
      // Mostra o erro no console e na interface
      console.error('Erro ao cadastrar usuário:', err);
      setError('Erro ao cadastrar: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      {/* Exibe a mensagem de sucesso e o botão de redirecionamento após o cadastro */}
      {success && (
        <div>
          <p style={{ color: 'green' }}>Cadastro realizado com sucesso!</p>
          <button onClick={() => navigate('/login')}>Voltar para Login</button>
        </div>
      )}

      {/* Botão de redirecionamento manual */}
      <div>
        <p>Já tem uma conta? <Link to="/login">Voltar para Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
