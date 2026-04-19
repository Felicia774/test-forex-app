import { CCYS, CCY_FLAGS, CCY_NAMES } from '../../data/constants'
import { fmtAmt, fmtUSD } from '../../utils/formatters'
import { toUSD, portfolioUSD } from '../../utils/rateUtils'

export default function WalletPanel({ wallet, rates }) {

  // only show currencies with balance > 0
  const holdings = CCYS.filter(c => (wallet[c] || 0) > 0.0001)

  // total portfolio value in USD
  const total = portfolioUSD(wallet, rates)

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>💼 My Wallet</h3>

      {/* total portfolio value */}
      <div style={styles.totalBox}>
        <div style={styles.totalLabel}>Total Portfolio Value</div>
        <div style={styles.totalValue}>{fmtUSD(total)}</div>
      </div>

      {/* individual currency rows */}
      <div style={styles.rows}>
        {holdings.length === 0 && (
          <div style={styles.empty}>No holdings yet</div>
        )}

        {holdings.map(c => {
          const amt = wallet[c] || 0
          const usd = toUSD(amt, c, rates)

          return (
            <div key={c} style={styles.row}>

              {/* flag */}
              <div style={styles.flag}>
                {CCY_FLAGS[c]}
              </div>

              {/* currency info */}
              <div style={styles.info}>
                <div style={styles.code}>{c}</div>
                <div style={styles.name}>{CCY_NAMES[c]}</div>
              </div>

              {/* amounts */}
              <div style={styles.right}>
                <div style={styles.amt}>
                  {fmtAmt(amt, c)}
                </div>
                <div style={styles.usd}>
                  ≈ {fmtUSD(usd)}
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '22px'
  },
  title: {
    fontSize: '15px',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: '18px'
  },
  totalBox: {
    background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
    border: '1px solid rgba(59,130,246,0.2)',
    borderRadius: '10px',
    padding: '16px',
    textAlign: 'center',
    marginBottom: '14px'
  },
  totalLabel: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text-secondary)',
    marginBottom: '4px'
  },
  totalValue: {
    fontSize: '28px',
    fontWeight: 900,
    color: 'var(--green)',
    fontVariantNumeric: 'tabular-nums'
  },
  rows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px'
  },
  empty: {
    textAlign: 'center',
    padding: '24px',
    color: 'var(--text-secondary)',
    fontSize: '13px'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '9px 11px'
  },
  flag: {
    fontSize: '18px',
    flexShrink: 0
  },
  info: {
    flex: 1
  },
  code: {
    fontSize: '13px',
    fontWeight: 800,
    color: 'var(--text-primary)'
  },
  name: {
    fontSize: '11px',
    color: 'var(--text-secondary)'
  },
  right: {
    textAlign: 'right'
  },
  amt: {
    fontSize: '13px',
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums',
    color: 'var(--text-primary)'
  },
  usd: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontVariantNumeric: 'tabular-nums'
  }
}