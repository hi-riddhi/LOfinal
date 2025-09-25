import { useNavigate } from 'react-router-dom'

export default function VerifyEmail() {
  const navigate = useNavigate()

  return (
    <div className="center" style={{minHeight:'60vh'}}>
      <div className="card" style={{maxWidth:560}}>
        <h1 className="title">Verify your email</h1>
        <p className="subtitle">We sent a verification link to your inbox.</p>
        <div className="row" style={{marginTop:16}}>
          <button className="cta secondary" onClick={()=>navigate('/onboarding')}>Continue</button>
        </div>
      </div>
    </div>
  )
}


