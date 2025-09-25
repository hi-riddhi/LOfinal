import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../../components/ThemeToggle'
import Logo from '../../components/Logo'
import '../../styles/auth-backgrounds.css'

export default function Questionnaire() {
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
  const [step, setStep] = useState(0)
  const [vibe, setVibe] = useState('')
  const [niches, setNiches] = useState([])
  const [contentStyles, setContentStyles] = useState([])
  const [tones, setTones] = useState([])
  const [endgames, setEndgames] = useState([])
  const [showMoreNiches, setShowMoreNiches] = useState(false)
  const [customVibe, setCustomVibe] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  const next = () => setStep(s => Math.min(6, s + 1))
  const back = () => setStep(s => Math.max(0, s - 1))

  const toggleNiche = (niche) => {
    setNiches(prev => prev.includes(niche) ? prev.filter(n => n !== niche) : [...prev, niche])
  }

  const toggleContentStyle = (style) => {
    setContentStyles(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style])
  }

  const toggleTone = (tone) => {
    setTones(prev => prev.includes(tone) ? prev.filter(t => t !== tone) : [...prev, tone])
  }

  const toggleEndgame = (goal) => {
    setEndgames(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal])
  }

  const finish = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch('http://localhost:3001/api/questionnaire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            name: vibe, 
            role: niches.join(', '), 
            intent: [...contentStyles, ...tones, ...endgames].join(','), 
            updates: 'Weekly Summary', 
            earlyAccess: true 
          })
        });
      } catch (error) {
        console.error('Failed to save questionnaire:', error);
      }
    }
    
    navigate('/create');
  }

  const coreNiches = [
    'Business & Startups',
    'Marketing & Sales', 
    'Tech & STEM',
    'Finance & Web3',
    'Law & Politics',
    'Arts & Culture',
    'Fitness & Sports',
    'Travel',
    'Fashion & Lifestyle'
  ];

  const moreNiches = [
    'Food & Health',
    'Education', 
    'Relationships',
    'Spirituality',
    'Environment',
    'Gaming',
    'Entertainment',
    'Cars & Motors',
    'Home & Outdoor',
    'Magic & Mysticism',
    'Animals'
  ];

  return (
    <div className="auth-page night questionnaire-page" style={{position: 'relative'}}>
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
        padding: '6rem 2rem 2rem',
        position: 'relative',
        zIndex: 2
      }}>
  <div style={{width: '100%', maxWidth: '750px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#181818', borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', padding: '2rem 1.5rem', zIndex: 2}}>
          {/* Progress bar and steps */}
          <div className="row" style={{width: '100%', maxWidth: 750, gap: 8, marginBottom: '1.5rem'}}>
            {Array.from({length: 7}).map((_, i) => (
              <div key={i} style={{
                flex: 1,
                height: 6,
                borderRadius: 999,
                background: i <= step ? 'var(--primary)' : 'var(--border)',
                transition: 'background 0.3s'
              }} />
            ))}
          </div>

              {step === 0 && (
                <div className="login-form-box" style={{maxWidth: '800px', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid #222', background: '#181818'}}>
                  <h2 className="title" style={{fontSize: '1.5rem', color: '#FFD700', textShadow: '0 2px 8px #000, 0 0 2px #FFD70088'}}>Welcome to LinkedOut. Ready to make LinkedIn your playground?</h2>
                  <div style={{color: 'var(--text-muted)', fontSize: '16px', marginBottom: '1rem'}}>3 quick questions, then boom — your first post idea is ready.</div>
                  <div className="row" style={{justifyContent:'center', marginTop:32}}>
                    <button className="btn btn-primary" onClick={next}>👉 Let's roll</button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="login-form-box" style={{maxWidth: '800px', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid #222', background: '#181818'}}>
                  <h2 className="title" style={{fontSize: '1.5rem', color: '#FFD700', textShadow: '0 2px 8px #000, 0 0 2px #FFD70088'}}>I'm a <span style={{color:'var(--primary)', textDecoration:'underline'}}>{vibe === 'Mystery Flex' && customVibe ? customVibe : vibe || '_____'}</span> ready to dominate LinkedIn.</h2>
                  <div className="row" style={{flexWrap:'wrap', gap:10, marginTop:16}}>
                    {['Student','Freelancer','Working Pro','Founder','Mystery Flex'].map(o=> (
                      <button key={o} className="btn btn-outline" style={{background:vibe===o?'rgba(255, 215, 0, 0.12)':'transparent', borderColor:vibe===o?'var(--primary)':'var(--border)'}} onClick={()=>setVibe(o)}>{o}</button>
                    ))}
                  </div>
                  {vibe === 'Mystery Flex' && (
                    <input 
                      className="input" 
                      placeholder="I'm a..." 
                      value={customVibe} 
                      onChange={(e) => setCustomVibe(e.target.value)}
                      style={{marginTop: 16}}
                    />
                  )}
                  <div className="row" style={{justifyContent:'space-between', marginTop:16}}>
                    <button className="btn btn-outline" onClick={back}>Back</button>
                    <button className="btn btn-primary" onClick={next} disabled={!vibe || (vibe === 'Mystery Flex' && !customVibe)}>Next</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="login-form-box" style={{maxWidth: '800px', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid #222', background: '#181818'}}>
                  <h2 className="title" style={{fontSize: '1.5rem', color: '#FFD700', textShadow: '0 2px 8px #000, 0 0 2px #FFD70088'}}>I want to dominate <span style={{color:'var(--primary)', textDecoration:'underline'}}>{niches.length ? niches.join(', ') : '_____'}</span> on LinkedIn.</h2>
                  <div className="stack" style={{marginTop:16}}>
                    <div className="row" style={{flexWrap:'wrap', gap:8}}>
                      {coreNiches.map(o=> (
                        <button key={o} className="btn btn-outline" style={{background:niches.includes(o)?'rgba(255, 215, 0, 0.12)':'transparent', borderColor:niches.includes(o)?'var(--primary)':'var(--border)'}} onClick={()=>toggleNiche(o)}>{o}</button>
                      ))}
                    </div>
                    <button className="btn btn-outline" onClick={()=>setShowMoreNiches(!showMoreNiches)} style={{alignSelf:'center', marginTop:8}}>✨ {showMoreNiches ? 'Show Less' : 'See More'}</button>
                    {showMoreNiches && (
                      <div className="row" style={{flexWrap:'wrap', gap:8, marginTop:8}}>
                        {moreNiches.map(o=> (
                          <button key={o} className="btn btn-outline" style={{background:niches.includes(o)?'rgba(255, 215, 0, 0.12)':'transparent', borderColor:niches.includes(o)?'var(--primary)':'var(--border)'}} onClick={()=>toggleNiche(o)}>{o}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="row" style={{justifyContent:'space-between', marginTop:16}}>
                    <button className="btn btn-outline" onClick={back}>Back</button>
                    <button className="btn btn-primary" onClick={next} disabled={!niches.length}>Next</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="login-form-box" style={{maxWidth: '800px', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid #222', background: '#181818'}}>
                  <h2 className="title" style={{fontSize: '1.5rem', color: '#FFD700', textShadow: '0 2px 8px #000, 0 0 2px #FFD70088'}}>My posts should be <span style={{color:'var(--primary)', textDecoration:'underline'}}>{contentStyles.length ? contentStyles.join(' & ') : '_____'}</span> with a <span style={{color:'var(--primary)', textDecoration:'underline'}}>{tones.length ? tones.join(' & ') : '_____'}</span> tone.</h2>
                  <div className="stack" style={{marginTop:16}}>
                    <div style={{color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', marginBottom: '8px'}}>Length:</div>
                    <div className="row" style={{flexWrap:'wrap', gap:8}}>
                      {['short & punchy','medium with stories','long & deep'].map(o=> (
                        <button key={o} className="btn btn-outline" style={{background:contentStyles.includes(o)?'rgba(255, 215, 0, 0.12)':'transparent', borderColor:contentStyles.includes(o)?'var(--primary)':'var(--border)'}} onClick={()=>toggleContentStyle(o)}>{o}</button>
                      ))}
                    </div>
                    <div style={{color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', marginBottom: '8px', marginTop: '16px'}}>Tone:</div>
                    <div className="row" style={{flexWrap:'wrap', gap:8, marginTop:8}}>
                      {['professional','conversational','bold/sarcastic','inspiring'].map(o=> (
                        <button key={o} className="btn btn-outline" style={{background:tones.includes(o)?'rgba(255, 215, 0, 0.12)':'transparent', borderColor:tones.includes(o)?'var(--primary)':'var(--border)'}} onClick={()=>toggleTone(o)}>{o}</button>
                      ))}
                    </div>
                  </div>
                  <div className="row" style={{justifyContent:'space-between', marginTop:16}}>
                    <button className="btn btn-outline" onClick={back}>Back</button>
                    <button className="btn btn-primary" onClick={next} disabled={!contentStyles.length || !tones.length}>Next</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="login-form-box" style={{maxWidth: '800px', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid #222', background: '#181818'}}>
                  <h2 className="title" style={{fontSize: '1.5rem', color: '#FFD700', textShadow: '0 2px 8px #000, 0 0 2px #FFD70088'}}>My LinkedIn endgame is to <span style={{color:'var(--primary)', textDecoration:'underline'}}>{endgames.length ? endgames.join(' & ') : '_____'}</span>.</h2>
                  <div className="row" style={{flexWrap:'wrap', gap:10, marginTop:16}}>
                    {['land clients','build my brand','get recruiter attention','grow my startup','create chaos'].map(o=> (
                      <button key={o} className="btn btn-outline" style={{background:endgames.includes(o)?'rgba(255, 215, 0, 0.12)':'transparent', borderColor:endgames.includes(o)?'var(--primary)':'var(--border)'}} onClick={()=>toggleEndgame(o)}>{o}</button>
                    ))}
                  </div>
                  <div className="row" style={{justifyContent:'space-between', marginTop:16}}>
                    <button className="btn btn-outline" onClick={back}>Back</button>
                    <button className="btn btn-primary" onClick={next} disabled={!endgames.length}>Next</button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="login-form-box" style={{maxWidth: '800px', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid #222', background: '#181818'}}>
                  <h2 className="title" style={{fontSize: '1.5rem', color: '#FFD700', textShadow: '0 2px 8px #000, 0 0 2px #FFD70088'}}>What's your LinkedIn profile URL?</h2>
                  <div style={{color: 'var(--text-muted)', fontSize: '16px', marginBottom: '1rem'}}>We'll use this to understand your current presence.</div>
                  <input 
                    className="input" 
                    type="url" 
                    placeholder="https://linkedin.com/in/yourprofile" 
                    value={linkedinUrl} 
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    style={{marginTop: 16}}
                  />
                  <div className="row" style={{justifyContent:'space-between', marginTop:16}}>
                    <button className="btn btn-outline" onClick={back}>Back</button>
                    <button className="btn btn-primary" onClick={next}>Next</button>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="login-form-box" style={{maxWidth: '800px', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid #222', background: '#181818'}}>
                  <h2 className="title" style={{fontSize: '1.5rem', color: '#FFD700', textShadow: '0 2px 8px #000, 0 0 2px #FFD70088'}}>So you're a {vibe === 'Mystery Flex' && customVibe ? customVibe : vibe} in {niches.join(' & ')} who wants {tones.join(' & ')}, {contentStyles.join(' & ')} posts to {endgames.join(' & ')}. Dangerous combo. We like it.</h2>
                  <div className="row" style={{justifyContent:'center', marginTop:32}}>
                    <button className="btn btn-primary" onClick={finish}>🔥 Cook my first post</button>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}