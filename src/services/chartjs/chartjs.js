import { sevenDayAverage, perHundredThousand, filterByDate } from '../transformations'

function filterLabelsByDate(labels, start = null, end = null) {
  if (start && end) {
    return labels.filter((day, i) => {
      return labels[i] >= start && labels[i] <= end
    })
  }
  return labels
}

export default function createChartDataObj(
  state1,
  state2 = null,
  compareOn = false,
  perCapitaOn = false,
  start = null,
  end = null
) {
  const dataObj = {
    labels: filterLabelsByDate(state1.timeSeries.dates, start, end),
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
