import { CCYS, CCY_FLAGS } from '../../data/constants'
import { fmtMatrix } from '../../utils/formatters'

// RateMatrix shows a 10x10 table
// rows = FROM currency
// columns = TO currency
// each cell = how much of TO you get for 1 unit of FROM

export default function RateMatrix({ getRate }) {
  return (
    <div style={styles.wrapper}>

      {/* header */}
      <div style={styles.top}>
        <div>
          <div style={styles.topTitle}>Full Cross-Rate Matrix</div>
          <div style={styles.topSub}>
            Row → FROM currency · Column → TO currency
          </div>
        </div>
        <div style={styles.liveBadge}>
          <span style={styles.liveDot} />
          LIVE
        </div>
      </div>

      {/* scrollable table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              {/* top-left corner header */}
              <th style={{ ...styles.th, textAlign: 'left', minWidth: '80px' }}>
                FROM \ TO
              </th>
              {/* column headers */}
              {CCYS.map(c => (
                <th key={c} style={styles.th}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CCYS.map(from => (
              <tr key={from}>

                {/* row header — FROM currency */}
                <td style={styles.rowHeader}>
                  {CCY_FLAGS[from]} {from}
                </td>

                {/* rate cells */}
                {CCYS.map(to => {
                  // same currency — show dash
                  if (from === to) {
                    return (
                      <td key={to} style={styles.sameCell}>—</td>
                    )
                  }
                  // different currency — show rate
                  return (
                    <td key={to} style={styles.cell}>
                      {fmtMatrix(getRate(from, to))}
                    </td>
                  )
                })}

              </tr>
            ))}
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
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    borderBottom: '1px solid var(--border)'
  },
  topTitle: {
    fontSize: '14px',
    fontWeight: 800,
    color: 'var(--text-primary)'
  },
  topSub: {
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
    color: 'var(--green)'
  },
  liveDot: {
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--green)',
    animation: 'blink 1.4s infinite'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    fontVariantNumeric: 'tabular-nums'
  },
  th: {
    background: 'var(--bg-secondary)',
    padding: '9px 11px',
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    color: 'var(--text-secondary)',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap'
  },
  rowHeader: {
    textAlign: 'left',
    fontWeight: 800,
    fontSize: '13px',
    color: 'var(--text-primary)',
    background: 'var(--bg-secondary)',
    padding: '8px 11px',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid rgba(30,45,74,0.4)'
  },
  cell: {
    padding: '8px 11px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    borderBottom: '1px solid rgba(30,45,74,0.4)',
    whiteSpace: 'nowrap'
  },
  sameCell: {
    padding: '8px 11px',
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontWeight: 700,
    background: 'rgba(59,130,246,0.04)',
    borderBottom: '1px solid rgba(30,45,74,0.4)'
  }
}