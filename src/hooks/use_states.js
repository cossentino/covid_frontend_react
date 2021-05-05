import { useState, useEffect } from 'react'
import fetchStates from '../services/fetchStates'

export default function useStates() {
  const [states, setStates] = useState({})

  useEffect(() => {
    async function getStatesFromAPI() {
      const response = await fetchStates()
      setStates(response)
    }
    getStatesFromAPI()
  }, [])
  return { states }
}
