import { Link } from 'react-router-dom'

export default function AuthHeader() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      zIndex: 100,
      backdropFilter: 'blur(10px)'
    }}>
      <Link to="/" style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        fontFamily: 'var(--font-brand)',
        color: 'var(--primary)',
        textDecoration: 'none'
      }}>
        LinkedOut
      </Link>
      <nav style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <Link to="/login" className="btn btn-outline" style={{padding: '8px 16px', fontSize: '14px'}}>Login</Link>
        <Link to="/signup" className="btn btn-primary" style={{padding: '8px 16px', fontSize: '14px'}}>Sign Up</Link>
      </nav>
    </header>
  )
}