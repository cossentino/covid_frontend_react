import stateMapper from '../constants/state_mapper'
import * as ROUTES from '../constants/routes'

function stateURL(stateCode) {
  return `https://api.covidactnow.org/v2/state/${stateCode}.timeseries.json?apiKey=${ROUTES.API_KEY}`
}

function filterTimeSeries(start, end, timeSeriesDict) {
  const output = {}
  const startIdx = timeSeriesDict.dates.indexOf(start)
  const endIdx = timeSeriesDict.dates.indexOf(end)
  output.dates = timeSeriesDict.dates.slice(startIdx, endIdx + 1)
  output.cases = timeSeriesDict.cases.slice(startIdx, endIdx + 1)
  return output
}

// return dict with state specs and timeseries data
// structure {abbrev, pop, totalcases, timeseries: {dates: [], cases: []}}
export default async function fetchState(
  stateAbbrev,
  includeTimeseries = false,
  start = null,
  end = null
) {
  // Fetch JSON object representing information for a single state
  const data = await fetch(stateURL(stateAbbrev))
    .then((resp) => resp.json())
    .then((json) => {
      const formattedDict = {}
      formattedDict.stateName = stateMapper[json.state]
      formattedDict.stateAbbrev = json.state
      formattedDict.population = json.population
      formattedDict.totalCases = json.actuals.cases

      // The same method is used whether fetching state data for a state card or for a graph.
      // If fetching for graph, pull out date and either the cases from that day or 0 if missing
      if (includeTimeseries) {
        formattedDict.timeSeries = {
          dates: json.actualsTimeseries.map((day) => day.date),
          cases: json.actualsTimeseries.map((day) => {
            return day.newCases ? day.newCases : 0
          })
        }
      }

      // If start and end dates specified, edit timeseries data to reflect date cutoffs
      if ('timeSeries' in formattedDict && start && end) {
        formattedDict.timeSeries = filterTimeSeries(start, end, formattedDict.timeSeries)
      }

      return formattedDict
    })

  return data
}
