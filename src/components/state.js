/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'

const State = ({ state }) => {
  return (
    <div className="col s3 m3" style={{ width: '250px' }}>
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title text-red-50">${state.attributes.name}</span>
          <p>Total Cases: ${state.attributes.total_cases}</p>
          <p>Population: ${state.attributes.population}</p>
          <p>Cases as % of Population: ${state.attributes.case_rate}%</p>
          {/* <p>Most recent entry: ${stateDays[stateDays.length - 1].date}</p> */}
        </div>
        <div className="card-action">
          <button
            type="button"
            className="show-state-detail btn"
            style={{ width: '100%', margin: 'auto' }}
            value={state.id}
          >
            County Breakdown
          </button>
        </div>
        <div className="card-action">
          <button
            type="button"
            className="show-graph btn"
            style={{ width: '100%', margin: 'auto' }}
            value={state.id}
          >
            Cases over time
          </button>
        </div>
      </div>
    </div>
  )
}

export default State

State.propTypes = {
  state: PropTypes.object
}
