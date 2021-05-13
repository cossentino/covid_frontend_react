/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { formatDateLabels } from '../../services/format'

const StateGraph = ({ caseData, myStateInfo, comparisonCaseData, comparisonState }) => {
  let data = null
  if (caseData.length > 0) {
    data = {
      labels: caseData.map((el) => {
        return formatDateLabels(el[0])
      }),
      datasets: [
        {
          label: myStateInfo.name,
          backgroundColor: 'rgba(30, 64, 175)',
          borderColor: 'rgba(30, 64, 175)',
          data: caseData.map((el) => el[1])
        }
      ]
    }
  }
  if (data && comparisonCaseData.length > 0) {
    data.datasets.push({
      label: comparisonState.name,
      backgroundColor: 'rgba(175, 0, 0)',
      borderColor: 'rgba(175, 0, 0)',
      data: comparisonCaseData.map((el) => el[1])
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
  caseData: PropTypes.array,
  myStateInfo: PropTypes.object,
  comparisonCaseData: PropTypes.array,
  comparisonState: PropTypes.object
}
