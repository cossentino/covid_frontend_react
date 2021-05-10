import { useState, useEffect } from 'react'
// import fetchStates from '../services/fetchStates'
import { useParams } from 'react-router-dom'

export default function useStates() {
  const [counties, setCounties] = useState([])
  const stateId = useParams().id

  useEffect(async () => {
    const { data } = await fetch(
      `http://localhost:3000/api/v1/states/${stateId}/counties`
    ).then((resp) => resp.json())
    setCounties(data)
  }, [])
  return counties
}
