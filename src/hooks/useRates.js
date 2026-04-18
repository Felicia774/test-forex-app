//What This File Does
//It handles one job only — making rates update every 3 seconds:
import { useState, useEffect } from 'react'
import { BASE_RATES } from '../data/constants'
import { tickRates } from '../utils/rateUtils'

export function useRates() {

  // rates starts as our hardcoded base rates
  const [rates, setRates] = useState(BASE_RATES)

  // prevRates lets us calculate % change
  // (we compare current rate to previous rate)
  const [prevRates, setPrevRates] = useState(BASE_RATES)

  useEffect(() => {

    // setInterval runs a function repeatedly
    // every 3000 milliseconds = every 3 seconds
    const interval = setInterval(() => {

      setRates(current => {
        // save current rates as "previous" before updating
        setPrevRates(current)
        // generate slightly new rates
        return tickRates(current)
      })

    }, 3000)

    // cleanup — stop the interval when component unmounts
    // this prevents memory leaks
    return () => clearInterval(interval)

  }, []) // [] = start interval once when app loads

  // helper: get rate between two currencies
  // e.g. getRate('USD', 'EUR') → 0.9218
  function getRate(from, to) {
    return rates[to] / rates[from]
  }

  // helper: get previous rate (for % change calculation)
  function getPrevRate(from, to) {
    return prevRates[to] / prevRates[from]
  }

  return {
    rates,        // current rates object
    prevRates,    // previous rates (for % change)
    getRate,      // function to get rate between two currencies
    getPrevRate   // function to get previous rate
  }
}