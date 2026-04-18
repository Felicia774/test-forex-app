import { fmtUSD } from '../../utils/formatters'
import { portfolioUSD } from '../../utils/rateUtils'

export default function Header({
  currentUser,  // logged in user object
  rates,        // current rates (for portfolio value)
  activePage,   // which page is active: 'dashboard','trade','history'
  onNavigate,   // function to change page
  onLogout      // function to logout
}) {

  // calculate total portfolio value in USD
  const totalUSD = currentUser
    ? portfolioUSD(currentUser.wallet, rates)
    : 0

  // get user initials for avatar
  // e.g. "Jane Doe" → "JD"
  const initials = currentUser
    ? currentUser.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  return (
    <header style={styles.header}>

      {/* Logo */}
      <div style={styles.brand}>
        💱 ForexSim
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        {['dashboard', 'trade', 'history'].map(page => (
          <button
            key={page}
            style={{
              ...styles.navBtn,
              ...(activePage === page ? styles.navBtnActive : {})
            }}
            onClick={() => onNavigate(page)}
          >
            {page === 'dashboard' && '📊 Dashboard'}
            {page === 'trade'     && '⚡ Trade'}
            {page === 'history'   && '📋 Ledger'}
          </button>
        ))}
      </nav>

      {/* Right side — balance + avatar + logout */}
      <div style={styles.right}>

        {/* Portfolio balance */}
        <div style={styles.balance}>
          <div style={styles.balanceLabel}>Portfolio (USD)</div>
          <div style={styles.balanceValue}>
            {fmtUSD(totalUSD)}
          </div>
        </div>

        {/* Avatar circle with initials */}
        <div style={styles.avatar}>
          {initials}
        </div>

        {/* Logout button */}
        <button
          style={styles.logoutBtn}
          onClick={onLogout}
          onMouseEnter={e => {
            e.target.style.borderColor = 'var(--red)'
            e.target.style.color = 'var(--red)'
          }}
          onMouseLeave={e => {
            e.target.style.borderColor = 'var(--border)'
            e.target.style.color = 'var(--text-secondary)'
          }}
        >
          Logout
        </button>

      </div>
    </header>
  )
}

// all styles in one object at the bottom
// keeps the JSX clean and readable
const styles = {
  header: {
    height: '58px',
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    gap: '16px',
    position: 'sticky',
    top: 0,
    zIndex: 200
  },
  brand: {
    fontSize: '18px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    whiteSpace: 'nowrap'
  },
  nav: {
    display: 'flex',
    gap: '4px',
    flex: 1
  },
  navBtn: {
    padding: '7px 16px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  navBtnActive: {
    background: 'var(--blue)',
    color: '#fff'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0
  },
  balance: {
    textAlign: 'right'
  },
  balanceLabel: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text-secondary)'
  },
  balanceValue: {
    fontSize: '16px',
    fontWeight: 800,
    color: 'var(--green)',
    fontVariantNumeric: 'tabular-nums'
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 800,
    color: '#fff',
    flexShrink: 0
  },
  logoutBtn: {
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  }
}