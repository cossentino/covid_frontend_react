import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'
import useStateData from '../../hooks/use_state_data'
import onSelectComparisonState from '../../services/eventHandlers/on_select_comparison_state'
import StateGraph from '../../components/visuals/state_graph'
import StateCompareSelector from '../../components/visuals/state_compare_selector'
import stateMapper from '../../constants/state_mapper'
import fetchState from '../../services/dataHandler'

// Pass down state as prop, but fetch state_days from state_days endpoint
const StateVisualsContainer = () => {
  const [state1, setState1] = useState({})
  const [state2, setState2] = useState({})
  const [compareOn, setCompareOn] = useState(false)
  const [perCapitaOn, setPerCapitaOn] = useState(false)
  const [filterDates, setFilterDates] = useState({ start: null, end: null })

  const myState = useParams().abbrev

  console.log(fetchState('MA', true, '2021-05-01', '2021-05-02'))

  useEffect(() => {
    async function fetchData() {
      const stateDict = await fetchState(myState, true, filterDates.start, filterDates.end)
      setState1(stateDict)
    }
    fetchData()
  }, [myState, filterDates.start, filterDates.end])

  const handleSelect = async (stateAbbrev) => {
    const myComparisonState = await fetchState(
      stateAbbrev,
      true,
      filterDates.start,
      filterDates.end
    )
    setState2(myComparisonState)
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-3">
        <h3 className="font-bold text-5xl text-blue-800">{state1.stateName}</h3>
        <div className="flex flex-col align-middle">
          <span>Population: {state1.population} </span>
          <span>Total Cases: {state1.totalCases} </span>
          {/* <span>Total Deaths: {stateInfo.totalDeaths} </span> */}
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
        <StateGraph
          state1={state1}
          state2={state2}
          compareOn={compareOn}
          perCapitaOn={perCapitaOn}
        />
      </div>
    </div>
  )
}

export default StateVisualsContainer
