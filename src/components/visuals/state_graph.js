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
  const dates = stateData.map((sd) => sd.attributes.date)
  const dailyCases = stateData.map((sd) => (sd.attributes.cases >= 0 ? sd.attributes.cases : 0))
  const bucketedData = oneWeekBuckets(dates, dailyCases)
  const rollingAvg = sevenDayAverage(dates, dailyCases)

  const data = {
    labels: rollingAvg.map((el) => el[0].getDate()),
    datasets: [
      {
        label: myState.name,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: rollingAvg.map((el) => el[1])
      }
    ]
  }
  return (
    <div className="container col-span-1">
      I am the state graph!
      <Line
        data={data}
        width={100}
        height={50}
        options={{ plugins: { legend: { display: numGraphs !== 1 } } }}
      />
    </div>
  )
}

export default StateGraph

StateGraph.propTypes = {
  stateData: PropTypes.object,
  myState: PropTypes.object
}
