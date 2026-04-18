import { useState, useEffect } from 'react'
import { CCYS } from '../data/constants'

// useAuth is a custom hook that manages:
// - user registration
// - login / logout
// - persisting session in localStorage
// - wallet initialization

export function useAuth() {

  // users = all registered accounts stored in memory
  const [users, setUsers] = useState({})

  // session = email of currently logged in user (or null)
  const [session, setSession] = useState(null)

  // Load saved users and session when app first opens
  useEffect(() => {
    try {
      const savedUsers = JSON.parse(
        localStorage.getItem('fxsim_users') || '{}'
      )
      const savedSession = localStorage.getItem('fxsim_session')

      setUsers(savedUsers)

      // Auto-login if session was saved
      if (savedSession && savedUsers[savedSession]) {
        setSession(savedSession)
      }
    } catch (e) {
      console.error('Failed to load saved data', e)
    }
  }, []) // [] means run once when app loads

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(users).length > 0) {
      localStorage.setItem('fxsim_users', JSON.stringify(users))
    }
  }, [users])

  // Get the current logged-in user's data
  const currentUser = session ? users[session] : null

  // REGISTER — create a new account
  function register(name, email, pass) {
    // Check if email already exists
    if (users[email]) {
      return { ok: false, error: 'Email already registered' }
    }
    if (pass.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters' }
    }

    // Create empty wallet — $10,000 USD, zero everything else
    const wallet = {}
    CCYS.forEach(c => {
      wallet[c] = c === 'USD' ? 10000 : 0
    })

    // Create the new user object
    const newUser = {
      name,
      email,
      pass,
      wallet,
      history: [],
      joinedAt: new Date().toISOString()
    }

    // Add to users and save
    const updatedUsers = { ...users, [email]: newUser }
    setUsers(updatedUsers)
    localStorage.setItem('fxsim_users', JSON.stringify(updatedUsers))

    // Auto-login after registration
    setSession(email)
    localStorage.setItem('fxsim_session', email)

    return { ok: true }
  }

  // LOGIN — check credentials and start session
  function login(email, pass) {
    const found = users[email]

    if (!found) {
      return { ok: false, error: 'No account found with that email' }
    }
    if (found.pass !== pass) {
      return { ok: false, error: 'Incorrect password' }
    }

    setSession(email)
    localStorage.setItem('fxsim_session', email)

    return { ok: true }
  }

  // LOGOUT — clear session
  function logout() {
    setSession(null)
    localStorage.removeItem('fxsim_session')
  }

  // UPDATE WALLET — called after every trade
  function updateUser(email, updatedData) {
    const updatedUsers = {
      ...users,
      [email]: { ...users[email], ...updatedData }
    }
    setUsers(updatedUsers)
    localStorage.setItem('fxsim_users', JSON.stringify(updatedUsers))
  }

  return {
    currentUser,   // the logged-in user's data (or null)
    session,       // the logged-in user's email (or null)
    register,      // function to create account
    login,         // function to login
    logout,        // function to logout
    updateUser     // function to update wallet/history
  }
}