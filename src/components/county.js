/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'

const County = ({ county }) => {
  return (
    <div className="container col-span-1">
      <div className="relative bg-white py-6 px-6 rounded-xl my-4 shadow-md">
        <span className="text-xl font-semibold my-2">{county.name}</span>
        <div className="mt-2">
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Total Cases:</span>
            <span className="text-sm">{county.totals.cases}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Population:</span>
            <span className="text-sm">{county.population}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Cases per 100,000 Residents:</span>
            <span className="text-sm">{county.totals.perCapitaCases}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default County

County.propTypes = {
  county: PropTypes.object
}
