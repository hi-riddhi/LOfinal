import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3001/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Password reset successful! You can now log in.');
        navigate('/login');
      } else {
        alert(data.error || 'Reset failed');
      }
    } catch (err) {
      alert('Connection error');
    }
  };

  return (
    <div className="center" style={{minHeight:'70vh', textAlign:'center'}}>
      <div style={{width:420}}>
        <h1 className="title">Reset Password</h1>
        <form onSubmit={handleReset} className="stack">
          <input 
            className="input" 
            type="password" 
            placeholder="New password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <input 
            className="input" 
            type="password" 
            placeholder="Confirm password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
          <div className="row" style={{justifyContent:'center'}}>
            <button type="submit" className="btn btn-primary">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}