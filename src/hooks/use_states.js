import { useState, useEffect } from 'react'
import { API_KEY } from '../constants/routes'

const STATES_ENDPOINT = `https://api.covidactnow.org/v2/states.json?apiKey=${API_KEY}`

export default function useStates() {
  const [states, setStates] = useState([])

  useEffect(async () => {
    const response = await fetch(STATES_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((resp) => resp.json())
    const formattedResponse = response.map((s) => {
      return {
        fips: s.fips,
        lastUpdatedDate: s.lastUpdatedDate,
        population: s.population,
        stateAbbrev: s.state,
        totals: {
          cases: s.actuals.cases,
          deaths: s.actuals.deaths,
          vaccinationsCompleted: s.actuals.vaccinationsCompleted,
          vaccinationsInitiated: s.actuals.vaccinationsInitiated
        }
      }
    })
    setStates(formattedResponse)
  }, [])

  return states
}
