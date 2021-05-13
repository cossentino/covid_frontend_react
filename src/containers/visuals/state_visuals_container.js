/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useStateData from '../../hooks/use_state_data'
import StateGraph from '../../components/visuals/state_graph'
import StateCompareSelector from '../../components/visuals/state_compare_selector'
import { sevenDayAverage } from '../../services/transformations'

// Pass down state as prop, but fetch state_days from state_days endpoint
const StateVisualsContainer = () => {
  const [myStateInfo, caseData] = useStateData()
  const [compareOn, setCompareOn] = useState(false)
  const [comparisonCaseData, setComparisonCaseData] = useState([])
  const [comparisonState, setComparisonState] = useState([])

  const handleSelect = async (stateId) => {
    const { data } = await fetch(
      `http://localhost:3000/api/v1/states/${stateId}/state_days`
    ).then((resp) => resp.json())
    const dates = data.map((sd) => sd.attributes.date)
    const dailyCases = data.map((sd) => (sd.attributes.cases >= 0 ? sd.attributes.cases : 0))
    setComparisonState(data[0].attributes.state)
    setComparisonCaseData(sevenDayAverage(dates, dailyCases))
  }

  const handleClickToCompare = () => {
    setCompareOn(!compareOn)
  }

  return myStateInfo ? (
    <div className="flex flex-col">
      <div className="flex justify-between py-3">
        <h3 className="font-bold text-5xl text-blue-800">{myStateInfo.name}</h3>
        <div className="flex flex-col align-middle">
          <span>Population: {myStateInfo.population} </span>
          <span>Total Cases: {myStateInfo.total_cases} </span>
        </div>
      </div>
      <div className="flex justify-end">
        {compareOn ? <StateCompareSelector handleSelect={handleSelect} /> : null}
        <button
          type="button"
          className="bg-red-200 text-sm hover:bg-red-400 rounded-md px-3 py-1"
          onClick={() => handleClickToCompare()}
        >
          Compare
        </button>
      </div>
      <div id="graph-container" className="my-3">
        <StateGraph
          caseData={caseData}
          myStateInfo={myStateInfo}
          comparisonCaseData={comparisonCaseData}
          comparisonState={comparisonState}
        />
      </div>
    </div>
  ) : (
    <Skeleton count={1} height={600} />
  )
}

export default StateVisualsContainer
