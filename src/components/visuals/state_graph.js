/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Bar, Line } from 'react-chartjs-2'
import { oneWeekBuckets, sevenDayAverage } from '../../services/transformations'
import chartConfigDataObj from '../../services/chart.js_config'

const StateGraph = ({ stateData, myState, comparisonData, comparisonState }) => {
  const [numGraphs, setNumGraphs] = useState(1)
  // const data = chartConfigDataObj(stateData, myState, comparisonData, comparisonState)
  const data = {
    labels: stateData.map((el) => `${el[0].getMonth()}-${el[0].getDate()}-${el[0].getFullYear()}`),
    datasets: [
      {
        label: myState.name,
        backgroundColor: 'rgba(30, 64, 175)',
        borderColor: 'rgba(30, 64, 175)',
        data: stateData.map((el) => el[1])
      }
    ]
  }
  if (comparisonState) {
    data.datasets.push({
      label: comparisonState.name,
      backgroundColor: 'rgba(175, 175, 175)',
      borderColor: 'rgba(175, 175, 175)',
      data: comparisonData.map((el) => el[1])
    })
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
  stateData: PropTypes.array,
  myState: PropTypes.object,
  comparisonData: PropTypes.array,
  comparisonState: PropTypes.object
}
