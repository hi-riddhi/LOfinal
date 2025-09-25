import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';
import Logo from '../../components/Logo';

export default function Create() {
  const [prompt, setPrompt] = useState('');
  const [clients, setClients] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [messages, setMessages] = useState([]);
  const [isNewChat, setIsNewChat] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  // Update menuItems constant
  const menuItems = {
    create: {
      icon: '+',
      label: 'New Post',
      subItems: ['Quick Post', 'Story Post'] // Reduced to two options
    },
    drafts: {
      icon: '✏️',
      label: 'Draft Posts',
      subItems: ['Recent Drafts', 'Saved Drafts']
    },
    ideas: {
      icon: '💡',
      label: 'Ideas',
      subItems: ['Hooks', 'AI Suggestions']  // Changed options
    },
    favorites: {
      icon: '⭐',
      label: 'Favorites',
      subItems: ['Starred Posts', 'Templates']  // Updated options
    },
    analytics: {
      icon: '📊',
      label: 'Analytics',
      subItems: ['Performance', 'Engagement']
    },
    goals: {
      icon: '🎯',
      label: 'Goals',
      subItems: ['Weekly Goals', 'Monthly Goals']
    }
  };

  // Update labelItems constant
  const labelItems = {
    settings: {
      icon: '⚙️',
      label: 'Settings',
      subItems: ['Logout', 'Delete Account']  // Changed options
    },
    subscription: {
      icon: '💎',
      label: 'Plan & Billing',
      subItems: ['Current Plan', 'Billing History']
    },
    support: {
      icon: '🎯',
      label: 'Support',
      subItems: ['Help Center', 'Contact Us']
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('lo_token');
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
    
    const newMessage = {
      text: prompt,
      timestamp: new Date(),
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newMessage]);
    setPrompt('');
    setIsNewChat(false);
  };

  // Add handleMenuItemClick function before the return statement
  const handleLogout = () => {
    console.log('Logout clicked'); // Debug log
    const confirmed = window.confirm('Are you sure you want to logout? 🥺');
    
    if (confirmed) {
      console.log('Logout confirmed'); // Debug log
      localStorage.removeItem('lo_token');
      navigate('/login');
    }
  };

  const handleMenuItemClick = (menuItem, subItem) => {
    console.log('Menu clicked:', menuItem, subItem); // Debug log
    
    if (menuItem === 'create' && subItem === 'Quick Post') {
      // Reset chat state
      setPrompt('');
      setMessages([]);
      setIsNewChat(true);
    }
    
    if (menuItem === 'settings' && subItem === 'Logout') {
      handleLogout();
    }

    if (menuItem === 'settings' && subItem === 'Delete Account') {
      const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
      if (confirmDelete) {
        // Add API call to delete account
        localStorage.removeItem('lo_token');
        navigate('/login');
      }
    }
  };



  return (
    <div className="linkedout-page">
      <div className="golden-spheres">
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} className="sphere" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            animationDelay: `${Math.random() * 15}s`
          }} />
        ))}
      </div>

      <div className="wireframe-layout">
        <div className="wireframe-main">
          <aside className={`wireframe-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
              {!sidebarCollapsed && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: 'var(--text)',
                  flex: 1
                }}>
                  <Logo style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                  LinkedOut
                </div>
              )}
              <button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                {sidebarCollapsed ? '»' : '«'}
              </button>
            </div>
            
            {sidebarCollapsed ? (
              <div className="collapsed-icons">
                <div className="collapsed-section">
                  {Object.entries(menuItems).map(([key, item]) => (
                    <div key={key} className="collapsed-icon">{item.icon}</div>
                  ))}
                </div>
                <div className="collapsed-section">
                  <div className="collapsed-icon">⚙️</div>
                  <div className="collapsed-icon posts-left">3</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="sidebar-section">
                  {Object.entries(menuItems).map(([key, item]) => (
                    <div key={key}>
                      <div 
                        className={`sidebar-item ${key === 'create' ? 'active' : ''}`}
                        onClick={() => toggleMenu(key)}
                        style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                      >
                        <span>{item.icon} {item.label}</span>
                        <span style={{fontSize: '12px', color: 'var(--text-muted)'}}>
                          {expandedMenus[key] ? '▼' : '▶'}
                        </span>
                      </div>
                      {expandedMenus[key] && (
                        <div style={{marginLeft: '20px', marginTop: '4px'}}>
                          {item.subItems.map((subItem, index) => (
                            <div 
                              key={index}
                              className="sidebar-item"
                              onClick={() => handleMenuItemClick(key, subItem)}
                              style={{
                                fontSize: '13px',
                                padding: '8px 12px',
                                color: 'var(--text-muted)',
                                borderLeft: '2px solid rgba(255,215,0,0.3)',
                                marginLeft: '8px',
                                marginBottom: '2px',
                                cursor: 'pointer'  // Add cursor pointer
                              }}
                            >
                              {subItem}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="sidebar-section" style={{marginTop: '20px'}}>
                  <div className="section-title">LABELS</div>
                  {Object.entries(labelItems).map(([key, item]) => (
                    <div key={key}>
                      <div 
                        className="sidebar-item"
                        onClick={() => toggleMenu(key)}
                        style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                      >
                        <span>{item.icon} {item.label}</span>
                        <span style={{fontSize: '12px', color: 'var(--text-muted)'}}>
                          {expandedMenus[key] ? '▼' : '▶'}
                        </span>
                      </div>
                      {expandedMenus[key] && (
                        <div style={{marginLeft: '20px', marginTop: '4px'}}>
                          {item.subItems.map((subItem, index) => (
                            <div 
                              key={index}
                              className="sidebar-item"
                              onClick={() => handleMenuItemClick(key, subItem)}
                              style={{
                                fontSize: '13px',
                                padding: '8px 12px',
                                color: key === 'settings' && (subItem === 'Logout' || subItem === 'Delete Account') 
                                  ? '#ff4444' 
                                  : 'var(--text-muted)',
                                borderLeft: '2px solid rgba(255,215,0,0.3)',
                                marginLeft: '8px',
                                marginBottom: '2px',
                                cursor: 'pointer',
                                fontWeight: key === 'settings' && (subItem === 'Logout' || subItem === 'Delete Account') 
                                  ? 'bold' 
                                  : 'normal'
                              }}
                            >
                              {subItem}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="sidebar-item posts-left" style={{marginTop: '16px'}}>
                    <span>Posts Left</span>
                    <div className="posts-count">3</div>
                  </div>
                  
                  <button className="upgrade-btn">
                    Upgrade plan
                  </button>
                </div>
              </div>
            )}
          </aside>

          <main className="wireframe-content">
            <header style={{
              position: 'fixed',
              top: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 2rem',
              height: '60px',
              zIndex: 100
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>👤</div>
              <ThemeToggle />
            </header>
            
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
                    🐙
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