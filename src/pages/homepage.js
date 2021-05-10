import React from 'react'
import StatesContainer from '../containers/states_container'

export default function Homepage() {
  return (
    <div className="container gap-4 justify-between m-auto max-w-screen-lg">
      <div id="welcome-paragraph" className="container">
        <h3 className="text-lg text-red-800 font-semibold">Welcome!</h3>
        <p className="mb-5">
          This tool allows you to view state-level data about COVID-19 cases in the US. Right now,
          the data for most states is current as of March 8, 2021. Click on a state to view total
          cases on a county level, or to view a graph of statewide cases since the beginning of the
          pandemic. You can also add more recent data at the state level by clicking the &quot;Add
          Data&quot; button above. Thank you and I hope you find this tool useful.
        </p>
        <p>
          COVID-19{' '}
          <a
            className=" text-blue-500 hover:underline hover:text-blue-800"
            href="https://github.com/nytimes/covid-19-data"
          >
            data
          </a>{' '}
          courtesy of New York Times&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Population{' '}
          <a
            className=" text-blue-500 hover:underline hover:text-blue-800"
            href="https://www.census.gov/programs-surveys/popest/data/data-sets.html"
          >
            data
          </a>{' '}
          courtesy of US Census Bureau
        </p>
        <StatesContainer />
      </div>
    </div>
  )
}
