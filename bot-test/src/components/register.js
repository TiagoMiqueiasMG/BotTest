import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
      });
      
      setSuccess(true);
      alert('Usuário cadastrado com sucesso!');
      navigate('/login');
      
    } catch (err) {      
      console.error('Erro ao cadastrar usuário:', err);
      setError('Erro ao cadastrar: ' + err.message);
    }
  };

  return (
    <div>
      <h2>CADASTRO</h2>
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
      {success && (
        <div>
          <p style={{ color: 'green' }}>Cadastro realizado com sucesso!</p>
          <button onClick={() => navigate('/login')}>Voltar para Login</button>
        </div>
      )}
      <div>
        <p>Já tem uma conta? <Link to="/login">Voltar para Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
