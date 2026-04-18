import { useState, useEffect } from 'react'

// styles for the toast container and individual toasts
const styles = {
  container: {
    position: 'fixed',
    top: '72px',
    right: '18px',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  toast: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    padding: '13px 16px',
    minWidth: '270px',
    display: 'flex',
    gap: '11px',
    alignItems: 'flex-start',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  }
}

// single toast item
// auto-disappears after 4.5 seconds
function ToastItem({ type, title, message, onRemove }) {

  useEffect(() => {
    // set a timer to remove this toast after 4500ms
    const timer = setTimeout(() => {
      onRemove()
    }, 4500)

    // cleanup timer if toast is removed early
    return () => clearTimeout(timer)
  }, []) // run once when toast appears

  const borderColor = type === 'ok'
    ? 'var(--green)'
    : 'var(--red)'

  const icon = type === 'ok' ? '✅' : '❌'

  return (
    <div style={{
      ...styles.toast,
      borderLeft: `3px solid ${borderColor}`
    }}>
      {/* icon */}
      <span style={{ fontSize: '17px', flexShrink: 0 }}>
        {icon}
      </span>

      {/* text content */}
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

// main Toast component
// manages a list of toasts
// provides addToast function to other components
export function useToast() {
  const [toasts, setToasts] = useState([])

  // add a new toast to the list
  function addToast(type, title, message) {
    const id = Date.now() // unique id for each toast
    setToasts(prev => [...prev, { id, type, title, message }])
  }

  // remove a toast by id
  function removeToast(id) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  // ToastContainer renders all active toasts
  function ToastContainer() {
    return (
      <div style={styles.container}>
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

  return {
    addToast,       // call this to show a toast
    ToastContainer  // render this in your app
  }
}