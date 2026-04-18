import { PAIRS, CCY_FLAGS } from '../../data/constants'
import { fmtRate } from '../../utils/formatters'

// PairsGrid shows 10 major currency pair cards
// each card shows current rate and % change from previous tick

export default function PairsGrid({ getRate, getPrevRate }) {
  return (
    <div style={styles.grid}>
      {PAIRS.map(([from, to]) => {

        // current rate
        const rate = getRate(from, to)

        // previous rate (from last tick 3 seconds ago)
        const prevRate = getPrevRate(from, to)

        // calculate % change
        const pct = ((rate - prevRate) / prevRate) * 100
        const isUp = pct >= 0

        return (
          <div key={`${from}${to}`} style={styles.card}>

            {/* pair label e.g. "EUR / USD" */}
            <div style={styles.label}>
              {CCY_FLAGS[from]} {from} / {CCY_FLAGS[to]} {to}
            </div>

            {/* current rate */}
            <div style={styles.rate}>
              {fmtRate(rate, from, to)}
            </div>

            {/* % change */}
            <div style={{
              ...styles.change,
              color: isUp ? 'var(--green)' : 'var(--red)'
            }}>
              {isUp ? '▲' : '▼'} {Math.abs(pct).toFixed(4)}%
            </div>

          </div>
        )
      })}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))',
    gap: '10px',
    marginBottom: '28px'
  },
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '14px 16px',
    cursor: 'default'
  },
  label: {
    fontSize: '11px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text-secondary)',
    marginBottom: '7px'
  },
  rate: {
    fontSize: '21px',
    fontWeight: 800,
    fontVariantNumeric: 'tabular-nums',
    color: 'var(--text-primary)'
  },
  change: {
    fontSize: '12px',
    fontWeight: 700,
    marginTop: '5px'
  }
}