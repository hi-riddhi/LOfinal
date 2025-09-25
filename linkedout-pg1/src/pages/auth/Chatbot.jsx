import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

export default function Chatbot() {
  const [prompt, setPrompt] = useState('');
  const [clients, setClients] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

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
      
      const clientsWithCounts = await Promise.all(
        data.map(async (client) => {
          try {
            const msgResponse = await fetch(`http://localhost:3001/api/clients/${client.id}/messages`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const messages = await msgResponse.json();
            return { ...client, messageCount: messages.length };
          } catch {
            return { ...client, messageCount: 0 };
          }
        })
      );
      
      setClients(clientsWithCounts);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  };

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    setPrompt('');
  };

  return (
    <div className="linkedout-page">
      <div className="dust-container">
        {Array.from({length: 50}).map((_, i) => (
          <div key={i} className="dust-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }} />
        ))}
      </div>

      <div className="wireframe-layout">
        <div className="wireframe-main">
          <aside className={`wireframe-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
              <span style={{fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)'}}>
                {sidebarCollapsed ? 'LO' : 'LinkedOut'}
              </span>
              <button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                {sidebarCollapsed ? '»' : '«'}
              </button>
            </div>
            
            {sidebarCollapsed ? (
              <div className="collapsed-icons">
                <div className="collapsed-section">
                  <div className="collapsed-icon active">+</div>
                  <div className="collapsed-icon">✏️</div>
                  <div className="collapsed-icon">💡</div>
                  <div className="collapsed-icon">⭐</div>
                  <div className="collapsed-icon">📊</div>
                  <div className="collapsed-icon">🎯</div>
                  <div className="collapsed-icon posts-left">3</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="sidebar-section">
                  <div className="sidebar-item active">+ New Post</div>
                  <div className="sidebar-item">✏️ Draft Posts</div>
                  <div className="sidebar-item">💡 Ideas</div>
                  <div className="sidebar-item">⭐ Favorites</div>
                  <div className="sidebar-item">📊 Analytics</div>
                  <div className="sidebar-item">🎯 Goals</div>
                </div>
                <div className="sidebar-item posts-left">
                  <span>Posts Left</span>
                  <div className="posts-count">3</div>
                </div>
              </div>
            )}
          </aside>

          <main className="wireframe-content">
            <div className="theme-toggle-corner">
              <ThemeToggle />
            </div>
            
            <div className="chat-interface">
              <div className="welcome-section">
                <h1 className="welcome-title">Hey there, Let's LinkedOut!</h1>
              </div>

              <div className="chat-input-container">
                <div className="chat-input-wrapper">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask Ollie anything"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendPrompt()}
                  />
                  <button className="chat-send-btn" onClick={handleSendPrompt}>
                    🔥
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}