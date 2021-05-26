import { generateTimeSeriesUrl } from '../format'
import { sevenDayAverage } from '../transformations'

const onSelectComparisonState = async (stateId, startDate, endDate) => {
  const url = generateTimeSeriesUrl(stateId, startDate, endDate)
  const { data } = await fetch(url).then((resp) => resp.json())
  const stateObj = data[0].attributes.state
  const dates = data.map((sd) => sd.attributes.date)
  const dailyCases = data.map((sd) => (sd.attributes.cases >= 0 ? sd.attributes.cases : 0))
  return [stateObj, sevenDayAverage(dates, dailyCases)]
}

export default onSelectComparisonState
