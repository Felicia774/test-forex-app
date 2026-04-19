import { CCY_FLAGS } from '../../data/constants'
import { fmtAmt, fmtRate } from '../../utils/formatters'

// TradeTable renders the full history of trades
// each row shows: time, type, from, to, rate, cost, value, P&L

export default function TradeTable({ history }) {

  // empty state
  if (history.length === 0) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📋</div>
          <h3 style={styles.emptyTitle}>No trades yet</h3>
          <p style={styles.emptySub}>
            Go to the Trade tab and execute your first order.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.wrapper}>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              {[
                '#',
                'Date & Time',
                'Type',
                'From',
                'To',
                'Rate at Trade',
                'Cost (USD eq.)',
                'Value (USD eq.)',
                'P&L (USD)'
              ].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((t, i) => {
              const plPos = (t.pl || 0) >= 0
              const plSign = plPos ? '+' : ''
              const plText = plSign + '$' + Math.abs(t.pl || 0).toFixed(4)

              return (
                <tr key={t.id}>

                  {/* trade number */}
                  <td style={{ ...styles.td, color: 'var(--text-muted)', fontSize: '12px' }}>
                    {history.length - i}
                  </td>

                  {/* time */}
                  <td style={{ ...styles.td, color: 'var(--text-secondary)', fontSize: '12px' }}>
                    {t.time}
                  </td>

                  {/* buy/sell badge */}
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: t.mode === 'buy'
                        ? 'rgba(16,185,129,0.12)'
                        : 'rgba(239,68,68,0.12)',
                      color: t.mode === 'buy'
                        ? 'var(--green)'
                        : 'var(--red)'
                    }}>
                      {t.mode.toUpperCase()}
                    </span>
                  </td>

                  {/* from */}
                  <td style={styles.td}>
                    {CCY_FLAGS[t.from]} <strong>{t.from}</strong>{' '}
                    {fmtAmt(t.amt, t.from)}
                  </td>

                  {/* to */}
                  <td style={styles.td}>
                    {CCY_FLAGS[t.to]} <strong>{t.to}</strong>{' '}
                    {fmtAmt(t.receive, t.to)}
                  </td>

                  {/* rate */}
                  <td style={{ ...styles.td, color: 'var(--text-secondary)' }}>
                    {fmtRate(t.rate, t.from, t.to)}
                  </td>

                  {/* cost in USD */}
                  <td style={styles.td}>
                    ${(t.costUSD || 0).toFixed(4)}
                  </td>

                  {/* value in USD */}
                  <td style={styles.td}>
                    ${(t.valueUSD || 0).toFixed(4)}
                  </td>

                  {/* P&L */}
                  <td style={{
                    ...styles.td,
                    color: plPos ? 'var(--green)' : 'var(--red)',
                    fontWeight: 800
                  }}>
                    {plText}
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px'
  },
  th: {
    background: 'var(--bg-secondary)',
    padding: '11px 14px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text-secondary)',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap'
  },
  td: {
    padding: '12px 14px',
    borderBottom: '1px solid rgba(30,45,74,0.4)',
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    color: 'var(--text-primary)'
  },
  badge: {
    display: 'inline-block',
    padding: '2px 9px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 800,
    textTransform: 'uppercase'
  },
  empty: {
    textAlign: 'center',
    padding: '52px 20px'
  },
  emptyIcon: {
    fontSize: '42px',
    marginBottom: '10px'
  },
  emptyTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '5px'
  },
  emptySub: {
    fontSize: '13px',
    color: 'var(--text-secondary)'
  }
}