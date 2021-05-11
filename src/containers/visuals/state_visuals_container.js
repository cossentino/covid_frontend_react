/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useStates from '../../hooks/use_states'
import State from '../../components/state'

// Pass down state as prop, but fetch state_days from state_days endpoint
const StateVisualsContainer = ({ state }) => {
  // const [name, setName] = useState('')
  // const [totalCases, setTotalCases] = useState(0)
  // const [population, setPopulation] = useState(0)
  // const [caseRate, setCaseRate] = useState(0)
  // const [stateDays, setStateDays] = useState([])

  // useEffect(() => {
  // }, [])
  // name, total cases, population, case_rate, state_days?, id

  const states = useStates()

  return states.length === 0 ? (
    <Skeleton count={1} height={60} />
  ) : (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg my-8">
      {states.map((s) => (
        <State state={s} key={s.id} />
      ))}
    </div>
  )
}

export default memo(StateVisualsContainer)

StateVisualsContainer.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.string,
    attributes: PropTypes.shape({
      name: PropTypes.string,
      case_rate: PropTypes.number,
      population: PropTypes.number,
      total_cases: PropTypes.number
    })
  })
}

StateVisualsContainer.defaultProps = {
  state: {}
}
