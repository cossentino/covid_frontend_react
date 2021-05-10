/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'

const County = ({ county }) => {
  return (
    <div className="container col-span-1">
      <div className="relative bg-white py-6 px-6 rounded-xl my-4 shadow-md">
        <span className="text-xl font-semibold my-2">{county.attributes.name}</span>
        <div className="mt-2">
          <p className="flex justify-between">
            <span className="text-sm font-semibold">Total Cases:</span>
            <span className="text-sm">{county.attributes.total_cases}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-sm font-semibold">Population:</span>
            <span className="text-sm">{county.attributes.population}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-sm font-semibold">Cases as % of Pop:</span>
            <span className="text-sm">{county.attributes.case_rate}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default County

County.propTypes = {
  county: PropTypes.object
}
