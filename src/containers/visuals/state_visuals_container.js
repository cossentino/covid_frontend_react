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
  const [compareOn, setCompareOn] = useState(false)
  const stateData = useStateData()
  const [comparisonDataset, setcomparisonDataset] = useState([])
  let myState = null
  if (stateData.length !== 0) {
    // eslint-disable-next-line prefer-destructuring
    myState = stateData[0]
  }

  const handleClickToCompare = () => {
    setCompareOn(!compareOn)
  }

  const handleSelect = async (stateId) => {
    const { data } = await fetch(
      `http://localhost:3000/api/v1/states/${stateId}/state_days`
    ).then((resp) => resp.json())
    const comparisonState = data[0].attributes.state
    const dates = data.map((sd) => sd.attributes.date)
    const dailyCases = data.map((sd) => (sd.attributes.cases >= 0 ? sd.attributes.cases : 0))
    const return_value = [comparisonState, sevenDayAverage(dates, dailyCases)]
    setcomparisonDataset(return_value)
  }

  return myState ? (
    <div className="flex flex-col">
      <div className="flex justify-between py-3">
        <h3 className="font-bold text-5xl text-blue-800">{myState.name}</h3>
        <div className="flex flex-col align-middle">
          <span>Population: {myState.population} </span>
          <span>Total Cases: {myState.total_cases} </span>
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
          stateData={stateData[1]}
          myState={myState}
          comparisonData={comparisonDataset[1]}
          comparisonState={comparisonDataset[0]}
        />
      </div>
    </div>
  ) : (
    <Skeleton count={1} height={600} />
  )
}

export default StateVisualsContainer

// StateVisualsContainer.propTypes = {
//   state: PropTypes.shape({
//     id: PropTypes.string,
//     attributes: PropTypes.shape({
//       name: PropTypes.string,
//       case_rate: PropTypes.number,
//       population: PropTypes.number,
//       total_cases: PropTypes.number
//     })
//   })
// }

// StateVisualsContainer.defaultProps = {
//   state: {}
// }
