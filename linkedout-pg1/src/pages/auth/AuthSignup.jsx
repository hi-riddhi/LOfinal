import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ThemeToggle from '../../components/ThemeToggle'
import Logo from '../../components/Logo'
import '../../styles/auth-backgrounds.css'

export default function AuthSignup() {
  useEffect(() => {
    // Create fairy dust effect
    const createFairyDust = () => {
      const container = document.querySelector('.fairy-dust-container');
      if (!container) return;
      
      const dust = document.createElement('div');
      dust.className = 'fairy-dust';
      dust.style.left = `${Math.random() * 100}%`;
      container.appendChild(dust);
      
      setTimeout(() => {
        dust.remove();
      }, 4000);
    };

    const interval = setInterval(createFairyDust, 200);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')

  const validatePassword = (pwd) => {
    return {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    }
  }

  const validation = validatePassword(password)

  const onSignUp = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = fd.get('name')
    const email = fd.get('email')
    const password = fd.get('password')
    const confirmPassword = fd.get('confirmPassword')
    const dob = fd.get('dob')
    
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    const isValid = validation.length && validation.uppercase && validation.number && validation.special
    if (!isValid) {
      alert('Password must meet all requirements')
      return
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        sessionStorage.setItem('lo_dob', dob || '')
        localStorage.setItem('token', data.token)
        navigate('/onboarding')
      } else {
        alert(data.error || 'Registration failed')
      }
    } catch (err) {
      alert('Connection error')
    }
  }

  return (
    <div className="auth-page night signup-page" style={{position: 'relative'}}>
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
        padding: '2rem',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{width:320, background: 'rgba(20,20,20,0.95)', borderRadius: 20, boxShadow: '0 8px 32px rgba(255,215,0,0.08)', padding: '2rem 1.5rem', zIndex: 2}}>
          <h1 className="title" style={{textAlign: 'center', color: '#FFD700', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem'}}>Create account</h1>
          <form onSubmit={onSignUp} className="stack">
            <input className="input" name="name" type="text" placeholder="Full name" required />
            <input className="input" name="email" type="email" placeholder="Email" required />
            <input className="input" name="dob" type="date" required />
            <div className="password-field">
              <input className="input" name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '👁️' : '👁️🗨️'}
              </button>
              <div className="password-requirements" style={{color: '#FFD700', fontSize: '0.9rem', marginTop: 4}}>
                At least 8 characters, at least 1 uppercase, at least 1 number and at least 1 special character
              </div>
            </div>
            <div className="password-field">
              <input className="input" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-enter password" required />
              <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? '👁️' : '👁️🗨️'}
              </button>
            </div>
            <div className="row" style={{justifyContent:'center', marginTop: '1.5rem'}}>
              <button type="submit" className="btn btn-primary" style={{background: '#FFD700', color: '#222', fontWeight: 700, fontSize: '1.1rem', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', cursor: 'pointer'}}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

