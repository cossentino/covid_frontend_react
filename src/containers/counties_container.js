/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useCounties from '../hooks/use_counties'
import County from '../components/county'

const CountiesContainer = () => {
  const counties = useCounties()

  return counties.length === 0 ? (
    <Skeleton count={1} height={60} />
  ) : (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg my-8">
      {counties.map((c) => (
        <County county={c} key={c.id} />
      ))}
    </div>
  )
}

export default CountiesContainer
