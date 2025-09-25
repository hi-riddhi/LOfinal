import { useState, useEffect } from 'react';

export default function ClientManager() {
  const [clients, setClients] = useState([]);
  const [newClientEmail, setNewClientEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/clients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  };

  const addClient = async (e) => {
    e.preventDefault();
    if (!newClientEmail.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: newClientEmail })
      });

      if (response.ok) {
        setNewClientEmail('');
        fetchClients();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add client');
      }
    } catch (error) {
      console.error('Failed to add client:', error);
      alert('Failed to add client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="panel">
        <h2 className="title">Client Manager</h2>
        <p className="subtitle">Add and manage your clients for messaging</p>

        <form onSubmit={addClient} className="stack">
          <div className="row">
            <input
              type="email"
              className="input"
              placeholder="Enter client email"
              value={newClientEmail}
              onChange={(e) => setNewClientEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Client'}
            </button>
          </div>
        </form>

        <div className="client-manager-list">
          <h3>Your Clients ({clients.length})</h3>
          {clients.length === 0 ? (
            <p className="no-clients">No clients added yet. Add your first client above.</p>
          ) : (
            <div className="clients-grid">
              {clients.map((client) => (
                <div key={client.id} className="client-card">
                  <div className="client-card-avatar">
                    {client.name ? client.name.charAt(0).toUpperCase() : client.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="client-card-info">
                    <h4>{client.name || client.email}</h4>
                    <p className="client-card-email">{client.email}</p>
                    <span className={`client-card-status ${client.status}`}>
                      {client.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="manager-actions">
          <a href="/chatbot" className="btn btn-primary">
            Go to Chat
          </a>
        </div>
      </div>
    </div>
  );
}