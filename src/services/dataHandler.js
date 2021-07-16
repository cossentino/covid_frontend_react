import stateMapper from '../constants/state_mapper'

function generateStateUrl(stateCode) {
  return `https://api.covidactnow.org/v2/state/${stateCode}.timeseries.json?apiKey=229ed0d259874d8f94d9f0a34e1c1e28`
}

function filterCasesByDate(dates, cases, start, end) {
  return cases.filter((i) => {
    return dates[i] >= start && dates[i] <= end
  })
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
      debugger
      if ('timeSeries' in formattedDict && start && end) {
        const myDates = formattedDict.timeSeries.dates
        const myCases = formattedDict.timeSeries.cases
        formattedDict.timeSeries.cases = filterCasesByDate(myDates, myCases, start, end)
      }
      return formattedDict
    })
  return data
}
