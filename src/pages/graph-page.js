/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Graph from '../components/visuals/graph'
import StateCompareSelector from '../components/visuals/state_compare_selector'

export default function GraphPage({
  state1,
  state2,
  dates,
  setDates,
  compareOn,
  setCompareOn,
  handleSelect,
  perCapitaOn,
  setPerCapitaOn
}) {
  return (
    <div className="container gap-4 justify-between m-auto max-w-screen-lg">
      <div className="flex flex-col">
        <div className="flex justify-between py-3">
          <h3 className="font-bold text-5xl text-blue-800">{state1.stateName}</h3>
          <div className="flex flex-col align-middle">
            <span>Population: {state1.population} </span>
            <span>Total Cases: {state1.totalCases} </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div id="date-filter" className="flex justify-between">
            <div className="flex items-center">
              <span>Start date: </span>
              <input
                type="date"
                className="text-sm rounded-md mx-2 px-3 py-1"
                onChange={(e) => setDates({ ...dates, start: e.target.value })}
              />
            </div>
            <div className="flex items-center">
              <span>End date: </span>
              <input
                type="date"
                className="text-sm rounded-md mx-2 px-3 py-1"
                onChange={(e) => setDates({ ...dates, end: e.target.value })}
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
              Displayed is a rolling seven-day average of COVID-19 cases reported on that day and
              six previous days.
            </p>
          </div>
          <Graph
            state1={state1}
            state2={state2}
            compareOn={compareOn}
            perCapitaOn={perCapitaOn}
            dates={dates}
          />
        </div>
      </div>
    </div>
  )
}

GraphPage.propTypes = {
  state1: PropTypes.object,
  state2: PropTypes.object,
  dates: PropTypes.object,
  setDates: PropTypes.func,
  compareOn: PropTypes.bool,
  setCompareOn: PropTypes.func,
  handleSelect: PropTypes.func,
  perCapitaOn: PropTypes.bool,
  setPerCapitaOn: PropTypes.func
}

GraphPage.defaultProps = {
  state1: {},
  state2: {},
  dates: {},
  setDates: () => null,
  compareOn: false,
  setCompareOn: () => null,
  handleSelect: () => null,
  perCapitaOn: false,
  setPerCapitaOn: () => null
}
