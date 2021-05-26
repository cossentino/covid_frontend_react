/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { formatDateLabels } from '../../services/format'
import { sevenDayAverage } from '../../services/transformations'

const StateGraph = ({ stateInfo, cases, dates }) => {
  let data = null
  if (cases.length > 0) {
    const sevenDayAvg = sevenDayAverage(dates, cases)
    data = {
      labels: dates,
      datasets: [
        {
          label: stateInfo.stateName,
          backgroundColor: 'rgba(30, 64, 175)',
          borderColor: 'rgba(30, 64, 175)',
          data: sevenDayAvg
        }
      ]
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
  stateInfo: PropTypes.object
}
