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
        data: state1.timeSeries.cases
      }
    ]
  }

  if (Object.keys(state2).length !== 0 && compareOn) {
    dataObj.datasets.push({
      label: state2.stateName,
      backgroundColor: 'rgba(175, 64, 175)',
      borderColor: 'rgba(175, 64, 175)',
      data: state2.timeSeries.cases
    })
  }

  if (perCapitaOn) {
    dataObj.datasets = [
      {
        ...dataObj.datasets[0],
        data: perHundredThousand(state1.population, state1.timeSeries.cases)
      }
    ]
    if (dataObj.datasets.length > 1) {
      dataObj.datasets[1] = {
        ...dataObj.datasets[1],
        data: perHundredThousand(state2.population, state2.timeSeries.cases)
      }
    }
  }

  return dataObj
}
