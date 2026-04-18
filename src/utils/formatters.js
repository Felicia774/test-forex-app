// Format a rate number based on which currencies are involved
// JPY pairs show fewer decimals because JPY is a large number
export function fmtRate(r, from, to) {
  if (to === 'JPY' || from === 'JPY') return r.toFixed(2)
  if (to === 'HKD' || from === 'HKD') return r.toFixed(4)
  return r.toFixed(5)
}

// Format an amount based on currency
// JPY, HKD, CNY don't need many decimal places
// e.g. 10000 → "10,000.00"
export function fmtAmt(n, c) {
  const dp = (c === 'JPY' || c === 'HKD' || c === 'CNY') ? 2 : 4
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: dp
  })
}

// Format a number as USD dollar amount
// e.g. 10000 → "$10,000.00"
export function fmtUSD(n) {
  return '$' + n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// Format rate for the matrix table
// adjusts decimal places based on size of number
export function fmtMatrix(r) {
  if (r >= 100) return r.toFixed(2)
  if (r >= 10)  return r.toFixed(3)
  if (r >= 1)   return r.toFixed(4)
  return r.toFixed(5)
}