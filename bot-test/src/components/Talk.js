import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Talk.css'; 

const Conversa = () => {
  const { id } = useParams(); 
  const [conversas, setConversas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {    
    const fetchConversas = async () => {
      try {
        const response = await axios.post('https://your.endpoint/commands', {
          method: "get",
          uri: `/messages/${id}`, 
          id: "unique-id-for-request" 
        }, {
          headers: {
            Authorization: 'Key YOUR_API_KEY',
            'Content-Type': 'application/json'
          }
        });
        setConversas(response.data.resource.items); 
      } catch (error) {
        console.error("Erro ao buscar conversas", error);
      }
    };

    fetchConversas();
  }, [id]);

  const handleBackToHome = () => {    
    navigate('/home'); 
  };

  const handleLogout = () => {    
    navigate('/login'); 
  };

  return (
    <div className="conversa-container">
      <h1>Conversa com o contato {id}</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="back-home-button" onClick={handleBackToHome}>Voltar para Home</button>

      <ul className="conversa-list">
        {conversas.map((msg, index) => (
          <li key={index}>
            <strong>{msg.direction === 'received' ? 'Contato: ' : 'Você: '}</strong>
            {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversa;


