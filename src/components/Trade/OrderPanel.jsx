import { useState } from 'react'
import { CCYS, CCY_FLAGS, CCY_NAMES, SPREAD } from '../../data/constants'
import { fmtRate, fmtAmt } from '../../utils/formatters'

export default function OrderPanel({
  wallet,    // current wallet balances
  getRate,   // function to get rate between two currencies
  onTrade    // function called when trade executes
}) {

  const [mode,  setMode]  = useState('buy')
  const [from,  setFrom]  = useState('USD')
  const [to,    setTo]    = useState('EUR')
  const [amt,   setAmt]   = useState('')

  // calculate preview values
  const rate    = getRate(from, to)
  const gross   = parseFloat(amt) * rate || 0
  const fee     = gross * SPREAD
  const receive = gross - fee
  const avail   = wallet[from] || 0

  function handleTrade() {
    const amount = parseFloat(amt)

    // validation
    if (!amount || amount <= 0) {
      onTrade({ ok: false, error: 'Enter a valid amount' })
      return
    }
    if (from === to) {
      onTrade({ ok: false, error: 'Choose different currencies' })
      return
    }
    if (amount > avail + 1e-9) {
      onTrade({
        ok: false,
        error: `Not enough ${from} — you have ${fmtAmt(avail, from)}`
      })
      return
    }

    // execute the trade
    onTrade({
      ok: true,
      from, to,
      amt: amount,
      receive,
      rate,
      fee,
      mode
    })

    // clear amount after trade
    setAmt('')
  }

  // quick amount buttons
  function setQuick(val) {
    if (val === 'max') {
      setAmt(avail.toFixed(4))
    } else {
      setAmt(String(val))
    }
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>New Order</h3>

      {/* buy / sell toggle */}
      <div style={styles.modeRow}>
        {['buy', 'sell'].map(m => (
          <button
            key={m}
            style={{
              ...styles.modeBtn,
              ...(mode === m
                ? m === 'buy'
                  ? styles.modeBuyActive
                  : styles.modeSellActive
                : {}
              )
            }}
            onClick={() => setMode(m)}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* from currency */}
      <div style={styles.formGroup}>
        <label style={styles.label}>From Currency</label>
        <div style={styles.selectWrap}>
          <select
            value={from}
            onChange={e => setFrom(e.target.value)}
            style={styles.select}
          >
            {CCYS.map(c => (
              <option key={c} value={c}>
                {CCY_FLAGS[c]} {c} — {CCY_NAMES[c]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* to currency */}
      <div style={styles.formGroup}>
        <label style={styles.label}>To Currency</label>
        <div style={styles.selectWrap}>
          <select
            value={to}
            onChange={e => setTo(e.target.value)}
            style={styles.select}
          >
            {CCYS.map(c => (
              <option key={c} value={c}>
                {CCY_FLAGS[c]} {c} — {CCY_NAMES[c]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* amount input */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Amount to Spend</label>

        {/* quick amount buttons */}
        <div style={styles.quickRow}>
          {[100, 500, 1000, 5000].map(v => (
            <button
              key={v}
              style={styles.quickBtn}
              onClick={() => setQuick(v)}
            >
              {v.toLocaleString()}
            </button>
          ))}
          <button
            style={styles.quickBtn}
            onClick={() => setQuick('max')}
          >
            MAX
          </button>
        </div>

        {/* amount input with currency tag */}
        <div style={styles.amtWrap}>
          <input
            type="number"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={amt}
            onChange={e => setAmt(e.target.value)}
            style={styles.input}
          />
          <span style={styles.amtTag}>{from}</span>
        </div>
      </div>

      {/* trade preview */}
      <div style={styles.preview}>
        <div style={styles.previewRow}>
          <span style={styles.previewLabel}>Exchange Rate</span>
          <span style={styles.previewValue}>
            {amt ? `1 ${from} = ${fmtRate(rate, from, to)} ${to}` : '—'}
          </span>
        </div>
        <div style={styles.previewRow}>
          <span style={styles.previewLabel}>You Receive</span>
          <span style={{ ...styles.previewValue, color: 'var(--green)' }}>
            {amt ? `${fmtAmt(receive, to)} ${to}` : '—'}
          </span>
        </div>
        <div style={styles.previewRow}>
          <span style={styles.previewLabel}>Spread Fee (0.10%)</span>
          <span style={{ ...styles.previewValue, color: 'var(--yellow)' }}>
            {amt ? `${fmtAmt(fee, to)} ${to}` : '—'}
          </span>
        </div>
      </div>

      {/* available balance */}
      <div style={styles.avail}>
        Available:{' '}
        <span style={{ color: 'var(--yellow)', fontWeight: 700 }}>
          {fmtAmt(avail, from)} {from}
        </span>
      </div>

      {/* execute button */}
      <button
        style={{
          ...styles.execBtn,
          background: mode === 'buy'
            ? 'var(--green)'
            : 'var(--red)'
        }}
        onClick={handleTrade}
      >
        ⚡ Execute {mode === 'buy' ? 'Buy' : 'Sell'} Order
      </button>

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
  modeRow: {
    display: 'flex',
    background: 'var(--bg-secondary)',
    borderRadius: '9px',
    padding: '3px',
    marginBottom: '18px',
    gap: '2px'
  },
  modeBtn: {
    flex: 1,
    padding: '9px',
    borderRadius: '7px',
    border: 'none',
    background: 'transparent',
    fontSize: '13px',
    fontWeight: 800,
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    letterSpacing: '0.5px'
  },
  modeBuyActive: {
    background: 'var(--green)',
    color: '#fff'
  },
  modeSellActive: {
    background: 'var(--red)',
    color: '#fff'
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
  selectWrap: {
    position: 'relative'
  },
  select: {
    width: '100%',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '10px 36px 10px 12px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none'
  },
  quickRow: {
    display: 'flex',
    gap: '5px',
    marginBottom: '8px'
  },
  quickBtn: {
    flex: 1,
    padding: '6px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    color: 'var(--text-secondary)',
    fontSize: '11px',
    fontWeight: 700,
    cursor: 'pointer'
  },
  amtWrap: {
    position: 'relative'
  },
  input: {
    width: '100%',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '11px 58px 11px 13px',
    color: 'var(--text-primary)',
    fontSize: '16px',
    fontWeight: 700,
    outline: 'none'
  },
  amtTag: {
    position: 'absolute',
    right: '11px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '12px',
    fontWeight: 800,
    color: 'var(--text-secondary)'
  },
  preview: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '13px',
    marginBottom: '13px'
  },
  previewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    marginBottom: '7px'
  },
  previewLabel: {
    color: 'var(--text-secondary)'
  },
  previewValue: {
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums',
    color: 'var(--text-primary)'
  },
  avail: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginBottom: '13px'
  },
  execBtn: {
    width: '100%',
    padding: '13px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 800,
    cursor: 'pointer',
    color: '#fff',
    letterSpacing: '0.3px'
  }
}