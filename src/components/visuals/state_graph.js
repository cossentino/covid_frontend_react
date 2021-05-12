/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Bar, Line } from 'react-chartjs-2'
import { oneWeekBuckets, sevenDayAverage } from '../../services/transformations'

const StateGraph = ({ stateData, myState }) => {
  const [numGraphs, setNumGraphs] = useState(1)
  const [datasets, setDatasets] = useState([])

  const data = {
    labels: stateData.map((el) => `${el[0].getMonth()}-${el[0].getDate()}-${el[0].getFullYear()}`),
    datasets: [
      {
        label: myState.name,
        backgroundColor: 'rgba(30, 64, 175',
        borderColor: 'rgba(30, 64, 175',
        data: stateData.map((el) => el[1])
      }
    ]
  }
  return (
    <div className="container col-span-1">
      <Line
        data={data}
        width={100}
        height={50}
        options={{
          plugins: { legend: { display: numGraphs !== 1 } },
          elements: { point: { radius: 0 } }
        }}
      />
    </div>
  )
}

export default StateGraph

StateGraph.propTypes = {
  stateData: PropTypes.object,
  myState: PropTypes.object
}
