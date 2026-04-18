import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

// AuthScreen is the container that holds both forms
// it manages which tab (login or register) is showing

export default function AuthScreen({ onLogin, onRegister }) {

  // which tab is active
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>

        {/* Logo */}
        <div style={styles.logoArea}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>💱</div>
            <div style={styles.brandName}>ForexSim</div>
          </div>
          <p style={styles.brandSub}>Virtual Forex Trading Platform</p>
        </div>

        {/* Tabs — Login / Register */}
        <div style={styles.tabs}>
          {['login', 'register'].map(tab => (
            <div
              key={tab}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'login' ? 'Sign In' : 'Register'}
            </div>
          ))}
        </div>

        {/* Show correct form based on active tab */}
        {activeTab === 'login'
          ? <LoginForm onLogin={onLogin} />
          : <RegisterForm onRegister={onRegister} />
        }

      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)'
  },
  box: {
    width: '420px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '18px',
    padding: '40px 36px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.6)'
  },
  logoArea: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  brandIcon: {
    width: '44px',
    height: '44px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px'
  },
  brandName: {
    fontSize: '26px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  brandSub: {
    fontSize: '13px',
    color: 'var(--text-secondary)'
  },
  tabs: {
    display: 'flex',
    background: 'var(--bg-secondary)',
    borderRadius: '10px',
    padding: '4px',
    marginBottom: '24px',
    gap: '2px'
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    padding: '9px',
    borderRadius: '7px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    userSelect: 'none'
  },
  tabActive: {
    background: 'var(--blue)',
    color: '#fff'
  }
}