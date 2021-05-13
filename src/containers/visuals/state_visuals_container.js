import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useStateData from '../../hooks/use_state_data'
import StateGraph from '../../components/visuals/state_graph'
import StateCompareSelector from '../../components/visuals/state_compare_selector'
import { sevenDayAverage, perHundredThousand } from '../../services/transformations'

// Pass down state as prop, but fetch state_days from state_days endpoint
const StateVisualsContainer = () => {
  const [comparisonCaseData, setComparisonCaseData] = useState([])
  const [comparisonState, setComparisonState] = useState(null)
  const [compareOn, setCompareOn] = useState(false)
  const [perCapitaOn, setPerCapitaOn] = useState(false)
  const [filterDates, setFilterDates] = useState({ startDate: null, endDate: null })
  const [myStateInfo, caseData] = useStateData(filterDates.startDate, filterDates.endDate)

  const handleSelect = async (stateId) => {
    const { data } = await fetch(
      `http://localhost:3000/api/v1/states/${stateId}/state_days`
    ).then((resp) => resp.json())
    const dates = data.map((sd) => sd.attributes.date)
    const dailyCases = data.map((sd) => (sd.attributes.cases >= 0 ? sd.attributes.cases : 0))
    setComparisonState(data[0].attributes.state)
    setComparisonCaseData(sevenDayAverage(dates, dailyCases))
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
      <div className="flex justify-between">
        <div id="date-filter" className="flex justify-between">
          <span>Start date</span>
          <input
            type="date"
            className="bg-red-200 text-sm hover:bg-red-400 rounded-md mx-1 px-3 py-1"
            onChange={(e) => setFilterDates({ ...filterDates, startDate: e.target.value })}
          />
          <span>End date</span>
          <input
            type="date"
            className="bg-red-200 text-sm hover:bg-red-400 rounded-md mx-1 px-3 py-1"
            onChange={(e) => setFilterDates({ ...filterDates, endDate: e.target.value })}
          />
        </div>
        <div className="flex">
          {compareOn ? <StateCompareSelector handleSelect={handleSelect} /> : null}
          <button
            type="button"
            className="bg-red-200 text-sm hover:bg-red-400 rounded-md mx-1 px-3 py-1"
            onClick={() => setCompareOn(!compareOn)}
          >
            Compare
          </button>
          <button
            type="button"
            className="bg-red-200 text-sm hover:bg-red-400 rounded-md mx-1 px-3 py-1"
            onClick={() => setPerCapitaOn(!perCapitaOn)}
          >
            {perCapitaOn ? 'Total' : 'Per 100,000'}
          </button>
        </div>
      </div>
      <div id="graph-container" className="my-3">
        <StateGraph
          caseData={perCapitaOn ? perHundredThousand(myStateInfo.population, caseData) : caseData}
          myStateInfo={myStateInfo}
          comparisonCaseData={
            perCapitaOn && compareOn && comparisonState
              ? perHundredThousand(comparisonState.population, comparisonCaseData)
              : comparisonCaseData
          }
          comparisonState={compareOn ? comparisonState : null}
          showLegend={compareOn}
        />
      </div>
    </div>
  ) : (
    <Skeleton count={1} height={600} />
  )
}

export default StateVisualsContainer
