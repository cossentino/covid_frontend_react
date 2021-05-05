/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import fetchStates from '../services/fetchStates'
import useStates from '../hooks/use_states'

const StatesContainer = () => {
  // const [name, setName] = useState('')
  // const [totalCases, setTotalCases] = useState(0)
  // const [population, setPopulation] = useState(0)
  // const [caseRate, setCaseRate] = useState(0)
  // const [stateDays, setStateDays] = useState([])

  // useEffect(() => {
  // }, [])
  const states = useStates()
  console.log(states.states[0])

  return (
    <div>
      <p>I am the states container</p>
    </div>
  )
}

export default StatesContainer
