/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import stateMapper from '../constants/state_mapper'
import fipsToIdMapper from '../constants/fips_to_id'

const State = ({ state }) => {
  return (
    <div className="container col-span-1">
      <div className="relative bg-white py-6 px-6 rounded-xl my-4 shadow-md">
        <span className="text-xl font-semibold my-2">{stateMapper[state.stateAbbrev]}</span>
        <div className="mt-2">
          <p className="flex justify-between">
            <span className="text-sm font-semibold">Total Cases:</span>
            <span className="text-sm">{state.totals.cases}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-sm font-semibold">Population:</span>
            <span className="text-sm">{state.population}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-sm font-semibold">Last Updated:</span>
            <span className="text-sm">{state.lastUpdatedDate}</span>
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <Link to={`/states/${state.stateAbbrev}/counties`}>
            <button
              type="button"
              className="flex items-center text-sm p-2 rounded-sm mx-auto bg-green-100 shadow-xs cursor-pointer hover:bg-green-400 hover:text-gray-100"
            >
              County Breakdown
            </button>
          </Link>
          <Link to={`/states/${state.stateAbbrev}/visualize`}>
            <button
              className="flex items-center text-sm p-2 rounded-sm mx-auto bg-green-100 shadow-xs cursor-pointer hover:bg-green-400 hover:text-gray-100"
              type="button"
            >
              Cases over time
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(State)

State.propTypes = {
  state: PropTypes.object
}
