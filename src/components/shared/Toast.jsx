import { useState, useEffect, useRef } from 'react'

function ToastItem({ type, title, message, onRemove }) {

  // useRef keeps the timer stable across renders
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onRemove()
    }, 4500)

    // cleanup on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, []) // run once only

  const borderColor = type === 'ok' ? 'var(--green)' : 'var(--red)'
  const icon = type === 'ok' ? '✅' : '❌'

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${borderColor}`,
      borderRadius: '10px',
      padding: '13px 16px',
      minWidth: '270px',
      display: 'flex',
      gap: '11px',
      alignItems: 'flex-start',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      <span style={{ fontSize: '17px', flexShrink: 0 }}>
        {icon}
      </span>
      <div>
        <div style={{
          fontSize: '13px',
          fontWeight: 800,
          marginBottom: '2px',
          color: 'var(--text-primary)'
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
          lineHeight: 1.4
        }}>
          {message}
        </div>
      </div>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState([])

  function addToast(type, title, message) {
    const id = Date.now()
    setToasts(prev => [...prev, { id, type, title, message }])
  }

  function removeToast(id) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  function ToastContainer() {
    return (
      <div style={{
        position: 'fixed',
        top: '72px',
        right: '18px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {toasts.map(t => (
          <ToastItem
            key={t.id}
            type={t.type}
            title={t.title}
            message={t.message}
            onRemove={() => removeToast(t.id)}
          />
        ))}
      </div>
    )
  }

  return { addToast, ToastContainer }
}