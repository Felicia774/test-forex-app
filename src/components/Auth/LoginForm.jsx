import { useState } from 'react'

export default function LoginForm({ onLogin }) {

  // track what user types into the form
  const [email, setEmail]   = useState('')
  const [pass,  setPass]    = useState('')
  const [error, setError]   = useState('')

  function handleSubmit(e) {
    e.preventDefault() // stop page from refreshing

    // basic validation
    if (!email || !pass) {
      setError('Please fill in all fields')
      return
    }

    // call login function passed from parent
    // onLogin comes from AuthScreen → from App.jsx → from useAuth
    const result = onLogin(email, pass)

    if (!result.ok) {
      setError(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      {/* error message — only shows if error exists */}
      {error && (
        <div style={styles.errorBox}>
          {error}
        </div>
      )}

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
          placeholder="Enter your password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          style={styles.input}
        />
      </div>

      <button type="submit" style={styles.submitBtn}>
        Sign In →
      </button>

    </form>
  )
}

const styles = {
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