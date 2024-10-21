import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Home.css'; 

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); 
  const contactsPerPage = 10; 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axios.post('https://msging.net/commands', {
          method: 'get',
          uri: '/contacts',
          id: 'efbeb502-942e-4020-8cca-41850fb17d74', 
        }, {
          headers: {
            'Authorization': `Key Ym90dGVzdGU3Mjk6WTN6T29XcThEU3I1dTQ4dnBTcVk=`, 
            'Content-Type': 'application/json'
          }
        });

        setContacts(response.data.resource.items);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const indexOfLastContact = page * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const handleClick = (id) => {
    navigate(`/contato/${id}`); // Navegar para a página de conversas
  };

  const handleLogout = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-container">
      <h1>Contatos</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Botão de logout */}
      <ul>
        {currentContacts.map(contact => (
          <li key={contact.identity} onClick={() => handleClick(contact.identity)}>
            {contact.name || contact.identity}
          </li>
        ))}
      </ul>
      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Página Anterior
        </button>
        <span> Página {page} </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={indexOfLastContact >= contacts.length}
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
};

export default Home;

