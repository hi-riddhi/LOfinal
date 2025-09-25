import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';
import Logo from '../../components/Logo';
import '../../styles/auth-backgrounds.css';

export default function Login() {
  useEffect(() => {
    // Create fairy dust effect
    const createFairyDust = () => {
      const container = document.querySelector('.fairy-dust-container');
      if (!container) return;
      const dust = document.createElement('div');
      dust.className = 'fairy-dust';
      dust.style.left = `${Math.random() * 100}%`;
      dust.style.top = `${Math.random() * 100}%`;
      container.appendChild(dust);
      setTimeout(() => {
        dust.remove();
      }, 4000);
    };
    const interval = setInterval(createFairyDust, 200);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithGoogle = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
        callback: handleGoogleResponse
      });
      window.google.accounts.id.prompt();
    } else {
      alert('Google Sign-In not loaded. Please try again.');
    }
  };
  
  const handleGoogleResponse = async (response) => {
    try {
      const googleResponse = await fetch('http://localhost:3001/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential })
      });
      
      const data = await googleResponse.json();
      
      if (googleResponse.ok) {
        localStorage.setItem('lo_token', data.token);
        localStorage.setItem('lo_user_id', data.user.id);
        localStorage.setItem('lo_user_name', data.user.name);
        navigate('/create');
      } else {
        alert(data.error || 'Google login failed');
      }
    } catch (err) {
      alert('Google login error');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('lo_token', data.token);
        localStorage.setItem('lo_user_id', data.user.id);
        localStorage.setItem('lo_user_name', data.user.name);
        navigate('/create');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  return (
    <div className="auth-page night login-page" style={{position: 'relative'}}>
      {/* Golden translucent spheres */}
      {Array.from({length: 5}).map((_, i) => (
        <div
          key={i}
          className="sphere"
          style={{
            position: 'absolute',
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            width: `${180 + i * 40}px`,
            height: `${180 + i * 40}px`,
            zIndex: 0,
            opacity: 0.5,
            filter: 'blur(8px)',
          }}
        />
      ))}
      <div className="fairy-dust-container" style={{position: 'absolute', inset: 0, zIndex: 1}} />
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'var(--text)'
        }}>
          <Logo />
          LinkedOut
        </div>
        <ThemeToggle />
      </header>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem'
      }}>
        <div className="auth-container" style={{width: '100%', maxWidth: '400px'}}>
          <div className="login-form-box">
            <form onSubmit={handleEmailLogin} className="stack">
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">Log In</button>
            </form>
            
            <div className="login-footer-links">
              <span style={{color: 'var(--primary)', cursor: 'pointer'}} onClick={() => {
                const email = prompt('Enter your email:');
                if (email) {
                  fetch('http://localhost:3001/api/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                  })
                  .then(res => res.json())
                  .then(data => alert(data.message || data.error))
                  .catch(() => alert('Connection error'));
                }
              }}>Forgot password?</span>
              <Link to="/signup" style={{fontWeight: '600'}}>Sign up</Link>
            </div>
          </div>

          <div className="login-google-box">
            <button onClick={signInWithGoogle} className="google-login-btn">
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src="/src/assetsnew/cropped_circle_image.png" alt="Google" style={{width: '18px', height: '18px'}} />
              </div>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}