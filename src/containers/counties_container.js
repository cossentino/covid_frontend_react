import React from 'react'
import { useParams } from 'react-router-dom'
// import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useCounties from '../hooks/use_counties'
import County from '../components/county'

const CountiesContainer = () => {
  const myState = useParams().abbrev
  const counties = []
  // useEffect(() => {
  //   const counties = useCounties(myState)
  // })

  return counties.length === 0 ? (
    <Skeleton count={1} height={600} />
  ) : (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg my-8">
      {counties.map((c) => {
        return <County county={c} />
      })}
    </div>
  )
}

export default CountiesContainer
