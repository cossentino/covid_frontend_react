/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'

const State = ({ name, totalCases, population, caseRate, stateDays, id }) => {
  return (
    <div className="col s3 m3" style={{ width: '250px' }}>
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title text-red-50">${name}</span>
          <p>Total Cases: ${totalCases}</p>
          <p>Population: ${population}</p>
          <p>Cases as % of Population: ${caseRate}%</p>
          <p>Most recent entry: ${stateDays[stateDays.length - 1].date}</p>
        </div>
        <div className="card-action">
          <button
            type="button"
            className="show-state-detail btn"
            style={{ width: '100%', margin: 'auto' }}
            value={id}
          >
            County Breakdown
          </button>
        </div>
        <div className="card-action">
          <button
            type="button"
            className="show-graph btn"
            style={{ width: '100%', margin: 'auto' }}
            value={id}
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
  name: PropTypes.string,
  totalCases: PropTypes.number,
  population: PropTypes.number,
  caseRate: PropTypes.number,
  stateDays: PropTypes.number,
  id: PropTypes.number
}
