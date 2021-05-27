import { perHundredThousand, sevenDayAverage } from './transformations'
import stateMapper from '../constants/state_mapper'

function generateStateUrl(state, start = null, end = null) {
  const urlBase = `https://api.covidactnow.org/v2/state/${state}.timeseries.json?apiKey=229ed0d259874d8f94d9f0a34e1c1e28`
  let url = ''
  if (start && end) {
    url = `${urlBase}?start_date=${start}&end_date=${end}`
  } else if (start) {
    url = `${urlBase}?start_date=${start}`
  } else if (end) {
    url = `${urlBase}?end_date=${end}`
  } else {
    url = urlBase
  }
  return url
}

// return dict with state specs and timeseries data
// structure {abbrev, pop, totalcases, timeseries}
export default async function fetchState(
  stateAbbrev,
  includeTimeseries = false,
  start = null,
  end = null
) {
  const data = await fetch(generateStateUrl(stateAbbrev, start, end))
    .then((resp) => resp.json())
    .then((json) => {
      const formattedDict = {}
      formattedDict.stateName = stateMapper[json.state]
      formattedDict.population = json.population
      formattedDict.totalCases = json.actuals.cases
      if (includeTimeseries) {
        formattedDict.timeSeries = {
          dates: json.actualsTimeseries.map((day) => day.date),
          cases: json.actualsTimeseries.map((day) => {
            return day.newCases ? day.newCases : 0
          })
        }
      }
      return formattedDict
    })
  return data
}
