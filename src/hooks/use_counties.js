import { useState, useEffect } from 'react'
import { API_KEY } from '../constants/routes'

export default function useCounties(stateCode) {
  const [counties, setCounties] = useState([])
  const COUNTIES_ENDPOINT = `https://api.covidactnow.org/v2/county/${stateCode}.json?apiKey=${API_KEY}`

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(COUNTIES_ENDPOINT, {
        method: 'GET'
      }).then((resp) => resp.json())
      const formattedResponse = response.map((c) => {
        return {
          fips: c.fips,
          name: c.county,
          lastUpdatedDate: c.lastUpdatedDate,
          population: c.population,
          stateAbbrev: c.state,
          totals: {
            cases: c.actuals.cases,
            deaths: c.actuals.deaths,
            perCapitaCases: Math.floor((c.actuals.cases / c.population) * 100000)
          }
        }
      })
      setCounties(formattedResponse)
    }
    fetchData()
  })

  return counties
}
