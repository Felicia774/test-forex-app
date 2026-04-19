import StatsRow from './StatsRow'
import TradeTable from './TradeTable'

export default function HistoryPage({ history }) {
  return (
    <div>

      {/* page header */}
      <div style={styles.secHdr}>
        <div>
          <div style={styles.secTitle}>History Ledger</div>
          <div style={styles.secSub}>
            Every trade with full profit & loss breakdown
          </div>
        </div>
      </div>

      {/* 4 stat cards */}
      <StatsRow history={history} />

      {/* full trade table */}
      <TradeTable history={history} />

    </div>
  )
}

const styles = {
  secHdr: {
    marginBottom: '18px'
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
  }
}