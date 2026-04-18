import { CCYS, CCY_FLAGS, CCY_NAMES } from '../../data/constants'

// CurrencyChips shows all 10 currencies in a row
// each chip shows the currency's current rate vs USD

export default function CurrencyChips({ rates }) {
  return (
    <div style={styles.row}>
      {CCYS.map(c => {

        // rate vs USD
        // if currency IS USD → show 1.0000
        // otherwise → how many USD does 1 unit cost?
        const usdRate = c === 'USD'
          ? '1.0000'
          : (1 / rates[c]).toFixed(c === 'JPY' ? 2 : 4) + ' USD'

        return (
          <div key={c} style={styles.chip}>
            <div style={styles.flag}>{CCY_FLAGS[c]}</div>
            <div style={styles.code}>{c}</div>
            <div style={styles.name}>{CCY_NAMES[c]}</div>
            <div style={styles.usdRate}>{usdRate}</div>
          </div>
        )
      })}
    </div>
  )
}

const styles = {
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gap: '8px',
    marginBottom: '24px'
  },
  chip: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    padding: '10px 8px',
    textAlign: 'center'
  },
  flag: {
    fontSize: '20px'
  },
  code: {
    fontSize: '12px',
    fontWeight: 800,
    marginTop: '4px',
    color: 'var(--text-primary)'
  },
  name: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
    marginTop: '1px'
  },
  usdRate: {
    fontSize: '11px',
    color: 'var(--yellow)',
    marginTop: '3px',
    fontVariantNumeric: 'tabular-nums'
  }
}