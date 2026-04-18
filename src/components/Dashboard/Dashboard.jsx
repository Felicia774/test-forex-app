import PairsGrid from './PairsGrid'
import CurrencyChips from './CurrencyChips'
import RateMatrix from './RateMatrix'

export default function Dashboard({ rates, getRate, getPrevRate }) {
  return (
    <div>

      {/* section header */}
      <div style={styles.secHdr}>
        <div>
          <div style={styles.secTitle}>Live Exchange Rates</div>
          <div style={styles.secSub}>
            10 major pairs · updates every 3 seconds
          </div>
        </div>
        <div style={styles.liveBadge}>
          <span style={styles.liveDot} />
          LIVE
        </div>
      </div>

      {/* 10 pair cards */}
      <PairsGrid
        getRate={getRate}
        getPrevRate={getPrevRate}
      />

      {/* currency chips row */}
      <div style={styles.secHdr}>
        <div>
          <div style={styles.secTitle}>Top 10 Most Traded Currencies</div>
          <div style={styles.secSub}>Current rate vs USD</div>
        </div>
      </div>

      <CurrencyChips rates={rates} />

      {/* full matrix */}
      <RateMatrix getRate={getRate} />

    </div>
  )
}

const styles = {
  secHdr: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  secTitle: {
    fontSize: '17px',
    fontWeight: 800,
    color: 'var(--text-primary)'
  },
  secSub: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginTop: '2px'
  },
  liveBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(16,185,129,0.12)',
    border: '1px solid rgba(16,185,129,0.25)',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--green)',
    whiteSpace: 'nowrap',
    flexShrink: 0
  },
  liveDot: {
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--green)'
  }
}