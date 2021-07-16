import stateMapper from '../constants/state_mapper'

function generateStateUrl(stateCode) {
  return `https://api.covidactnow.org/v2/state/${stateCode}.timeseries.json?apiKey=229ed0d259874d8f94d9f0a34e1c1e28`
}

function filterTimeSeries(start, end, timeSeriesDict) {
  const output = {}
  const startIdx = timeSeriesDict.dates.indexOf(start)
  const endIdx = timeSeriesDict.dates.indexOf(end)
  output.dates = timeSeriesDict.dates.slice(startIdx, endIdx + 1)
  output.cases = timeSeriesDict.cases.slice(startIdx, endIdx + 1)
  debugger
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
  const data = await fetch(generateStateUrl(stateAbbrev))
    .then((resp) => resp.json())
    .then((json) => {
      const formattedDict = {}
      formattedDict.stateName = stateMapper[json.state]
      formattedDict.stateAbbrev = json.state
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
      if ('timeSeries' in formattedDict && start && end) {
        formattedDict.timeSeries = filterTimeSeries(start, end, formattedDict.timeSeries)
        // const myDates = formattedDict.timeSeries.dates
        // const myCases = formattedDict.timeSeries.cases
        // formattedDict.timeSeries.cases = filterCasesByDate(myDates, myCases, start, end)
      }
      return formattedDict
    })
  return data
}
