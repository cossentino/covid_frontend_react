/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import createChartDataObj from '../../services/chartjs/chartjs'

const StateGraph = ({ state1, state2, compareOn, perCapitaOn }) => {
  let data = null
  if (Object.keys(state1).length !== 0) {
    data = createChartDataObj(state1, state2, compareOn, perCapitaOn)
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
  state1: PropTypes.object,
  state2: PropTypes.object,
  perCapitaOn: PropTypes.bool,
  compareOn: PropTypes.bool
}
