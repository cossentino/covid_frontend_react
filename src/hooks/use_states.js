import { useState, useEffect } from 'react'
// import fetchStates from '../services/fetchStates'
import { STATES_ENDPOINT } from '../constants/routes'

export default function useStates() {
  const [states, setStates] = useState([])

  useEffect(async () => {
    const { data } = await fetch(STATES_ENDPOINT).then((resp) => resp.json())
    setStates(data)
  }, [])

  return states
}
