import { sevenDayAverage, perHundredThousand, filterByDate } from '../transformations'

export default function createChartDataObj(
  state1,
  state2 = null,
  compareOn = false,
  perCapitaOn = false
) {
  const dataObj = {
    labels: state1.timeSeries.dates,
    datasets: [
      {
        label: state1.stateName,
        backgroundColor: 'rgba(30, 64, 175)',
        borderColor: 'rgba(30, 64, 175)',
        data: perCapitaOn
          ? perHundredThousand(state1.population, sevenDayAverage(state1.timeSeries.cases))
          : sevenDayAverage(state1.timeSeries.cases)
      }
    ]
  }

  if (Object.keys(state2).length !== 0 && compareOn) {
    dataObj.datasets.push({
      label: state2.stateName,
      backgroundColor: 'rgba(175, 64, 175)',
      borderColor: 'rgba(175, 64, 175)',
      data: perCapitaOn
        ? perHundredThousand(state2.population, sevenDayAverage(state2.timeSeries.cases))
        : sevenDayAverage(state2.timeSeries.cases)
    })
  }

  return dataObj
}
