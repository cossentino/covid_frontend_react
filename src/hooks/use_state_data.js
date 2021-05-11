import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function useStateData() {
  const [stateDays, setStateDays] = useState([])
  const stateId = useParams().id

  useEffect(async () => {
    const { data } = await fetch(
      `http://localhost:3000/api/v1/states/${stateId}/state_days`
    ).then((resp) => resp.json())
    setStateDays(data)
  }, [])
  return stateDays
}
