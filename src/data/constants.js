export const CCYS = [
  'USD', 'EUR', 'JPY', 'GBP',
  'CNY', 'AUD', 'CAD', 'CHF',
  'HKD', 'SGD'
]

export const CCY_NAMES = {
  USD: 'US Dollar',
  EUR: 'Euro',
  JPY: 'Japanese Yen',
  GBP: 'British Pound',
  CNY: 'Chinese Yuan',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  HKD: 'Hong Kong Dollar',
  SGD: 'Singapore Dollar'
}

export const CCY_FLAGS = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  JPY: '🇯🇵',
  GBP: '🇬🇧',
  CNY: '🇨🇳',
  AUD: '🇦🇺',
  CAD: '🇨🇦',
  CHF: '🇨🇭',
  HKD: '🇭🇰',
  SGD: '🇸🇬'
}

// Base rates: units of currency per 1 USD
// e.g. EUR: 0.9218 means 1 USD = 0.9218 EUR
export const BASE_RATES = {
  USD: 1.0000,
  EUR: 0.9218,
  JPY: 149.52,
  GBP: 0.7895,
  CNY: 7.2415,
  AUD: 1.5312,
  CAD: 1.3621,
  CHF: 0.8924,
  HKD: 7.8240,
  SGD: 1.3456
}

export const PAIRS = [
  ['EUR', 'USD'],
  ['USD', 'JPY'],
  ['GBP', 'USD'],
  ['USD', 'CHF'],
  ['AUD', 'USD'],
  ['USD', 'CAD'],
  ['USD', 'CNY'],
  ['EUR', 'JPY'],
  ['GBP', 'JPY'],
  ['EUR', 'GBP']
]

export const SPREAD = 0.001 // 0.10% bid-ask spread