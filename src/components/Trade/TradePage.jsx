import OrderPanel from './OrderPanel'
import WalletPanel from './WalletPanel'
import { toUSD } from '../../utils/rateUtils'

export default function TradePage({
  wallet,
  rates,
  getRate,
  onTrade,
  addToast,
  updateUser,
  session
}) {

  // handles trade result from OrderPanel
  function handleTrade(result) {
    if (!result.ok) {
      addToast('err', 'Trade Failed', result.error)
      return
    }

    const { from, to, amt, receive, rate, fee, mode } = result

    // update wallet balances
    const newWallet = { ...wallet }
    newWallet[from] = (newWallet[from] || 0) - amt
    newWallet[to]   = (newWallet[to]   || 0) + receive

    // calculate P&L
    const costUSD  = toUSD(amt, from, rates)
    const valueUSD = toUSD(receive, to, rates)
    const pl       = valueUSD - costUSD

    // create trade record
    const trade = {
      id: Date.now(),
      from, to, amt, receive, rate, fee,
      costUSD, valueUSD, pl,
      mode,
      time: new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })
    }

    // save to user data
    updateUser(session, {
      wallet: newWallet,
      history: [trade, ...(wallet.history || [])]
    })

    // show success toast
    const plSign = pl >= 0 ? '+' : ''
    addToast(
      'ok',
      'Trade Executed',
      `${from} → ${to} | Got ${receive.toFixed(2)} ${to} | P&L: ${plSign}$${Math.abs(pl).toFixed(4)}`
    )
  }

  return (
    <div>
      {/* page header */}
      <div style={styles.secHdr}>
        <div>
          <div style={styles.secTitle}>Execute Trade</div>
          <div style={styles.secSub}>
            Buy and sell currencies using your virtual balance
          </div>
        </div>
      </div>

      {/* two column layout */}
      <div style={styles.grid}>
        <OrderPanel
          wallet={wallet}
          getRate={getRate}
          onTrade={handleTrade}
        />
        <WalletPanel
          wallet={wallet}
          rates={rates}
        />
      </div>
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
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '360px 1fr',
    gap: '20px',
    alignItems: 'start'
  }
}