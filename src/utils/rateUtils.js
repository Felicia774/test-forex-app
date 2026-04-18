import { BASE_RATES } from '../data/constants'

// Get rate: how many units of [to] do you get for 1 unit of [from]
// e.g. getRate('USD', 'EUR') → 0.9218
// e.g. getRate('EUR', 'JPY') → 162.something
export function getRate(rates, from, to) {
  return rates[to] / rates[from]
}

// Convert any amount of any currency to USD value
// e.g. toUSD(100, 'EUR', rates) → roughly 108 USD
export function toUSD(amount, ccy, rates) {
  return amount / rates[ccy]
}

// Calculate total portfolio value in USD
// adds up all currency holdings converted to USD
export function portfolioUSD(wallet, rates) {
  return Object.entries(wallet).reduce((sum, [ccy, amount]) => {
    return sum + toUSD(amount, ccy, rates)
  }, 0)
}

// Generate slightly fluctuated rates (simulates live market)
// each currency moves randomly by a tiny amount each tick
export function tickRates(currentRates) {
  const VOLS = {
    JPY: 0.0018,   // JPY moves a bit more
    CNY: 0.0006,   // CNY is tightly controlled
    HKD: 0.0003,   // HKD is pegged, barely moves
    default: 0.0012
  }

  const newRates = { ...currentRates }

  Object.keys(newRates).forEach(c => {
    if (c === 'USD') return // USD is always 1, never changes
    const v = VOLS[c] || VOLS.default
    const noise = 1 + (Math.random() - 0.5) * 2 * v
    const decimals = (c === 'JPY' || c === 'HKD' || c === 'CNY') ? 4 : 5
    newRates[c] = parseFloat((newRates[c] * noise).toFixed(decimals))
  })

  return newRates
}