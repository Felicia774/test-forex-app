import { fmtUSD } from '../../utils/formatters'

// StatsRow shows 4 summary cards at the top of history page
// total trades, total P&L, best trade, worst trade

export default function StatsRow({ history }) {

  const totalTrades = history.length

  // add up all P&L values
  const totalPL = history.reduce((sum, t) => sum + (t.pl || 0), 0)

  // find best and worst single trade
  const best  = history.length > 0
    ? Math.max(...history.map(t => t.pl || 0))
    : null

  const worst = history.length > 0
    ? Math.min(...history.map(t => t.pl || 0))
    : null

  // helper to format P&L with + or - sign
  function fmtPL(n) {
    if (n === null) return '—'
    const sign = n >= 0 ? '+' : ''
    return sign + fmtUSD(Math.abs(n))
  }

  return (
    <div style={styles.grid}>

      {/* total trades */}
      <div style={styles.card}>
        <div style={styles.label}>Total Trades</div>
        <div style={{ ...styles.value, color: 'var(--blue)' }}>
          {totalTrades}
        </div>
      </div>

      {/* total P&L */}
      <div style={styles.card}>
        <div style={styles.label}>Realised P&L</div>
        <div style={{
          ...styles.value,
          color: totalPL >= 0 ? 'var(--green)' : 'var(--red)'
        }}>
          {fmtPL(totalPL)}
        </div>
      </div>

      {/* best trade */}
      <div style={styles.card}>
        <div style={styles.label}>Best Trade P&L</div>
        <div style={{ ...styles.value, color: 'var(--green)' }}>
          {fmtPL(best)}
        </div>
      </div>

      {/* worst trade */}
      <div style={styles.card}>
        <div style={styles.label}>Worst Trade P&L</div>
        <div style={{ ...styles.value, color: 'var(--red)' }}>
          {fmtPL(worst)}
        </div>
      </div>

    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    marginBottom: '20px'
  },
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    padding: '14px 16px'
  },
  label: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text-secondary)',
    marginBottom: '5px'
  },
  value: {
    fontSize: '22px',
    fontWeight: 900,
    fontVariantNumeric: 'tabular-nums'
  }
}