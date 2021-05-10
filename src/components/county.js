/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
// import Link from 'react-router-dom'

const County = ({ county }) => {
  return (
    <div className="container col-span-1">
      I am a county
      <span>{county.id}</span>
      {/* <div className="relative bg-white py-6 px-6 rounded-xl my-4 shadow-md">
        <span className="text-xl font-semibold my-2">{state.attributes.name}</span>
        <div className="mt-2">
          <p className="flex justify-between">
            <span className="text-sm font-semibold">Total Cases:</span>
            <span className="text-sm">{state.attributes.total_cases}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-sm font-semibold">Population:</span>
            <span className="text-sm">{state.attributes.population}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-sm font-semibold">Cases as % of Pop:</span>
            <span className="text-sm">{state.attributes.case_rate}</span>
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center text-sm p-2 rounded-sm mx-auto bg-green-100 shadow-xs cursor-pointer hover:bg-green-400 hover:text-gray-100">
            <Link to={`/states/${state.id}/counties`}>
              <button type="button" className="show-state-detail btn" value={state.id}>
                County Breakdown
              </button>
            </Link>
          </div>
          <div className="flex items-center text-sm p-2 rounded-sm mx-auto bg-green-100 shadow-xs cursor-pointer hover:bg-green-400 hover:text-gray-100">
            <Link to={`/states/${state.id}/counties`}>
              <button type="button" className="show-graph btn" value={state.id}>
                Cases over time
              </button>
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default County

County.propTypes = {
  county: PropTypes.object
}
