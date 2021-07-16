import { useState, useEffect } from 'react'
import { API_KEY } from '../constants/routes'

const STATES_ENDPOINT = `https://api.covidactnow.org/v2/states.json?apiKey=${API_KEY}`

export default function useStates() {
  const [states, setStates] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(STATES_ENDPOINT, {
        method: 'GET'
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
            vaccinationsInitiated: s.actuals.vaccinationsInitiated,
            perCapitaCases: Math.floor((s.actuals.cases / s.population) * 100000)
          }
        }
      })
      setStates(formattedResponse)
    }
    fetchData()
  }, [])

  return states
}
