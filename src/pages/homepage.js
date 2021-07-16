import React from 'react'
import StatesContainer from '../containers/states_container'
import DataCitation from '../components/static/data_citation'

export default function Homepage() {
  return (
    <div className="container gap-4 justify-between m-auto max-w-screen-lg">
      <div id="welcome-paragraph" className="container">
        <h3 className="text-lg text-red-800 font-semibold">Welcome!</h3>
        <p className="mb-5">
          This tool allows you to view state-level data about COVID-19 cases in the US. Click on a
          state to view total cases on a county level, or to view a graph of statewide cases since
          the beginning of the pandemic. Thank you and I hope you find this tool useful.
        </p>
        <DataCitation />
        <StatesContainer />
      </div>
    </div>
  )
}
