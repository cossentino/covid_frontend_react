import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useStateData from '../../hooks/use_state_data'
import StateGraph from '../../components/visuals/state_graph'
import StateCompareSelector from '../../components/visuals/state_compare_selector'
import { sevenDayAverage, perHundredThousand } from '../../services/transformations'

// Pass down state as prop, but fetch state_days from state_days endpoint
const StateVisualsContainer = () => {
  const [myStateInfo, caseData] = useStateData()
  const [compareOn, setCompareOn] = useState(false)
  const [comparisonCaseData, setComparisonCaseData] = useState([])
  const [comparisonState, setComparisonState] = useState({})
  const [hundredThousandOn, setHundredThousandOn] = useState(false)
  const handleSelect = async (stateId) => {
    const { data } = await fetch(
      `http://localhost:3000/api/v1/states/${stateId}/state_days`
    ).then((resp) => resp.json())
    const dates = data.map((sd) => sd.attributes.date)
    const dailyCases = data.map((sd) => (sd.attributes.cases >= 0 ? sd.attributes.cases : 0))
    setComparisonState(data[0].attributes.state)
    setComparisonCaseData(sevenDayAverage(dates, dailyCases))
  }

  const handlePerHundredThousand = () => {
    // if (caseData) {
    //   caseData = perHundredThousand(myStateInfo.population, caseData)
    // }
    // if (comparisonCaseData) {
    //   comparisonCaseData = perHundredThousand(comparisonState.population, comparisonCaseData)
    // }
    // console.log(caseData)
    setHundredThousandOn(!hundredThousandOn)
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
        <button
          type="button"
          className="bg-red-200 text-sm hover:bg-red-400 rounded-md px-3 py-1"
          onClick={() => handlePerHundredThousand()}
        >
          Per 100,000
        </button>
      </div>
      <div id="graph-container" className="my-3">
        <StateGraph
          caseData={
            hundredThousandOn ? perHundredThousand(myStateInfo.population, caseData) : caseData
          }
          myStateInfo={myStateInfo}
          comparisonCaseData={
            hundredThousandOn
              ? perHundredThousand(comparisonState.population, comparisonCaseData)
              : comparisonCaseData
          }
          comparisonState={comparisonState}
        />
      </div>
    </div>
  ) : (
    <Skeleton count={1} height={600} />
  )
}

export default StateVisualsContainer
