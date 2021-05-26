/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { formatDateLabels } from '../../services/format'
import { perHundredThousand, sevenDayAverage } from '../../services/transformations'

const StateGraph = ({
  stateInfo,
  cases,
  dates,
  compareTimeSeries,
  comparisonState,
  perCapitaOn,
  compareOn
}) => {
  let data = null

  if (cases.length > 0) {
    data = {
      labels: dates,
      datasets: [
        {
          label: stateInfo.stateName,
          backgroundColor: 'rgba(30, 64, 175)',
          borderColor: 'rgba(30, 64, 175)',
          data: sevenDayAverage(dates, cases)
        }
      ]
    }
  }

  if (compareTimeSeries.length > 0 && compareOn) {
    const myDates = compareTimeSeries.map((d) => d[0])
    const myCases = compareTimeSeries.map((d) => d[1])
    data.datasets = [
      ...data.datasets,
      {
        label: 'Test label',
        backgroundColor: 'rgba(175, 64, 175)',
        borderColor: 'rgba(175, 64, 175)',
        data: sevenDayAverage(myDates, myCases)
      }
    ]
  } else if (compareTimeSeries.length > 0 && !compareOn) {
    data.datasets = [data.datasets[0]]
  }

  if (perCapitaOn) {
    data.datasets[0] = {
      ...data.datasets[0],
      data: perHundredThousand(stateInfo.population, data.datasets[0].data)
    }

    if (data.datasets.length > 1 && compareOn) {
      data.datasets[1] = {
        label: comparisonState.stateName,
        backgroundColor: 'rgba(175, 64, 175)',
        borderColor: 'rgba(175, 64, 175)',
        data: perHundredThousand(comparisonState.population, data.datasets[1].data)
      }
    }
  }

  return (
    <div className="container col-span-1">
      {data ? (
        <Line
          data={data}
          width={100}
          height={50}
          options={{
            plugins: { legend: { display: true } },
            elements: { point: { radius: 0 } }
          }}
        />
      ) : null}
    </div>
  )
}

export default StateGraph

StateGraph.propTypes = {
  cases: PropTypes.array,
  dates: PropTypes.array,
  stateInfo: PropTypes.object,
  compareTimeSeries: PropTypes.array,
  comparisonState: PropTypes.object,
  perCapitaOn: PropTypes.bool,
  compareOn: PropTypes.bool
}
