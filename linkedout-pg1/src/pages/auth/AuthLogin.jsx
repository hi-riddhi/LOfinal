import { useNavigate } from 'react-router-dom'

export default function AuthLogin() {
  const navigate = useNavigate()

  const onAuth = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const email = fd.get('email')
    const password = fd.get('password')
    
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('lo_token', data.token)
        localStorage.setItem('lo_user_id', data.user.id)
        localStorage.setItem('lo_user_name', data.user.name)
        navigate('/onboarding')
      } else {
        alert(data.error || 'Login failed')
      }
    } catch (err) {
      alert('Connection error')
    }
  }

  return (
    <div className="center" style={{minHeight:'70vh', textAlign:'center'}}>
      <div style={{width:420}}>
        <h1 className="title">Log in</h1>
        <form onSubmit={onAuth} className="stack">
          <input className="input" name="email" type="email" placeholder="Email" required />
          <input className="input" name="password" type="password" placeholder="Password" required />
          <div className="row" style={{justifyContent:'center'}}>
            <button type="submit" className="btn btn-primary">Log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}


