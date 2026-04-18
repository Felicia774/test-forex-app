import { useState } from 'react'

export default function RegisterForm({ onRegister }) {

  const [name,  setName]  = useState('')
  const [email, setEmail] = useState('')
  const [pass,  setPass]  = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !email || !pass) {
      setError('Please fill in all fields')
      return
    }

    const result = onRegister(name, email, pass)

    if (!result.ok) {
      setError(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      {/* bonus banner — shows seed money */}
      <div style={styles.bonusBanner}>
        🎁 New accounts start with <strong>$10,000 USD</strong> virtual balance
      </div>

      {/* error message */}
      {error && (
        <div style={styles.errorBox}>
          {error}
        </div>
      )}

      {/* name field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          placeholder="Jane Doe"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* email field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* password field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Min 6 characters"
          value={pass}
          onChange={e => setPass(e.target.value)}
          style={styles.input}
          minLength={6}
        />
      </div>

      <button type="submit" style={styles.submitBtn}>
        Create Account & Start Trading →
      </button>

    </form>
  )
}

const styles = {
  bonusBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(16,185,129,0.12)',
    border: '1px solid rgba(16,185,129,0.25)',
    borderRadius: '8px',
    padding: '11px 14px',
    fontSize: '13px',
    color: 'var(--green)',
    marginBottom: '16px'
  },
  errorBox: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '8px',
    padding: '9px 12px',
    fontSize: '13px',
    color: '#fca5a5',
    marginBottom: '12px'
  },
  formGroup: {
    marginBottom: '14px'
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: 'var(--text-secondary)',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '11px 13px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none'
  },
  submitBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '4px'
  }
}