import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useStateData from '../../hooks/use_state_data'
import onSelectComparisonState from '../../services/eventHandlers/on_select_comparison_state'
import StateGraph from '../../components/visuals/state_graph'
import StateCompareSelector from '../../components/visuals/state_compare_selector'
import { sevenDayAverage, perHundredThousand } from '../../services/transformations'
import { generateTimeSeriesUrl } from '../../services/format'

// Pass down state as prop, but fetch state_days from state_days endpoint
const StateVisualsContainer = () => {
  const [comparisonCaseData, setComparisonCaseData] = useState([])
  const [comparisonState, setComparisonState] = useState(null)
  const [compareOn, setCompareOn] = useState(false)
  const [perCapitaOn, setPerCapitaOn] = useState(false)
  const [filterDates, setFilterDates] = useState({ startDate: null, endDate: null })

  const handleSelect = async (stateId) => {
    const [myState, myCaseData] = await onSelectComparisonState(
      stateId,
      filterDates.startDate,
      filterDates.endDate
    )
    console.log(myState)
    setComparisonState(myState)
    setComparisonCaseData(myCaseData)
  }

  const [stateInfo, timeSeriesData] = useStateData()
  const dates = timeSeriesData.map((el) => el[0])
  const cases = timeSeriesData.map((el, i) => {
    if (i > 0 && el[1] != null) {
      return el[1] - timeSeriesData[i - 1][1]
    }
    return el[1]
  })

  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-3">
        <h3 className="font-bold text-5xl text-blue-800">{stateInfo.stateName}</h3>
        <div className="flex flex-col align-middle">
          <span>Population: {stateInfo.population} </span>
          <span>Total Cases: {stateInfo.totalCases} </span>
          <span>Total Deaths: {stateInfo.totalDeaths} </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div id="date-filter" className="flex justify-between">
          <div className="flex items-center">
            <span>Start date: </span>
            <input
              type="date"
              className="text-sm rounded-md mx-2 px-3 py-1"
              onChange={(e) => setFilterDates({ ...filterDates, startDate: e.target.value })}
            />
          </div>
          <div className="flex items-center">
            <span>End date: </span>
            <input
              type="date"
              className="text-sm rounded-md mx-2 px-3 py-1"
              onChange={(e) => setFilterDates({ ...filterDates, endDate: e.target.value })}
            />
          </div>
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
      <div id="graph-container" className="my-3 flex flex-col items-center justify-between">
        <div>
          <p className=" w-auto m-4 p-4 rounded-sm border border-red-600">
            Displayed is a rolling seven-day average of COVID-19 cases reported on that day and the
            six previous days.
          </p>
        </div>
        <StateGraph cases={cases} dates={dates} stateInfo={stateInfo} />
      </div>
    </div>
  )
}

export default StateVisualsContainer
