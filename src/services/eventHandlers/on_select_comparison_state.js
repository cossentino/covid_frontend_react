import { generateTimeSeriesUrl } from '../format'
import { sevenDayAverage } from '../transformations'

const onSelectComparisonState = async (stateName) => {
  const url = generateTimeSeriesUrl(stateName)
  const data = await fetch(url).then((resp) => resp.json())
  return [
    { stateName: data.name, population: data.population },
    data.actualsTimeseries.map((day) => [day.date, day.newCases])
  ]
}

export default onSelectComparisonState
