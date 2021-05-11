/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'

const StateGraph = ({ stateData, myState }) => {
  const dailyCases = stateData.map((sd) => {
    if (sd.attributes.cases >= 0) {
      return sd.attributes.cases
    }
    return 0
  })
  const dates = stateData.map((sd) => sd.attributes.date)

  const data = {
    labels: dates,
    datasets: [
      {
        label: '',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dailyCases
      }
    ]
  }
  return (
    <div className="container col-span-1">
      I am the state graph!
      <Bar data={data} width={100} height={50} options={{ maintainAspectRatio: true }} />
    </div>
  )
}

export default StateGraph

StateGraph.propTypes = {
  stateData: PropTypes.object,
  myState: PropTypes.object
}
