import { useState } from 'react'

// hooks
import { useAuth }  from './hooks/useAuth'
import { useRates } from './hooks/useRates'
import { useToast } from './components/shared/Toast'

// shared components
import Header from './components/shared/Header'

// page components
import AuthScreen  from './components/Auth/AuthScreen'
import Dashboard   from './components/Dashboard/Dashboard'
import TradePage   from './components/Trade/TradePage'
import HistoryPage from './components/History/HistoryPage'

export default function App() {

  // ── hooks ──────────────────────────────────────────
  const {
    currentUser,
    session,
    register,
    login,
    logout,
    updateUser
  } = useAuth()

  const {
    rates,
    getRate,
    getPrevRate
  } = useRates()

  const {
    addToast,
    ToastContainer
  } = useToast()

  // ── navigation state ───────────────────────────────
  // which page is showing: 'dashboard', 'trade', 'history'
  const [activePage, setActivePage] = useState('dashboard')

  // ── auth handlers ──────────────────────────────────
  function handleLogin(email, pass) {
    const result = login(email, pass)
    if (result.ok) {
      addToast('ok', 'Welcome back!', `Good to see you again!`)
      setActivePage('dashboard')
    }
    return result
  }

  function handleRegister(name, email, pass) {
    const result = register(name, email, pass)
    if (result.ok) {
      addToast(
        'ok',
        '🎉 Welcome to ForexSim!',
        'Your account is live with $10,000.00 USD.'
      )
      setActivePage('dashboard')
    }
    return result
  }

  function handleLogout() {
    logout()
    setActivePage('dashboard')
    addToast('ok', 'Signed out', 'See you next time!')
  }

  // ── not logged in → show auth screen ──────────────
  if (!currentUser) {
    return (
      <>
        <AuthScreen
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
        <ToastContainer />
      </>
    )
  }

  // ── logged in → show full app ──────────────────────
  return (
    <>
      {/* sticky top navigation bar */}
      <Header
        currentUser={currentUser}
        rates={rates}
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={handleLogout}
      />

      {/* main content area */}
      <div style={styles.main}>

        {/* dashboard page */}
        {activePage === 'dashboard' && (
          <Dashboard
            rates={rates}
            getRate={getRate}
            getPrevRate={getPrevRate}
          />
        )}

        {/* trade page */}
        {activePage === 'trade' && (
          <TradePage
            wallet={currentUser.wallet}
            rates={rates}
            getRate={getRate}
            onTrade={() => {}}
            addToast={addToast}
            updateUser={updateUser}
            session={session}
          />
        )}

        {/* history page */}
        {activePage === 'history' && (
          <HistoryPage
            history={currentUser.history || []}
          />
        )}

      </div>

      {/* toast notifications — always on top */}
      <ToastContainer />
    </>
  )
}

const styles = {
  main: {
    flex: 1,
    padding: '24px',
    maxWidth: '1500px',
    margin: '0 auto',
    width: '100%'
  }
}