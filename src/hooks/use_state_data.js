import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { sevenDayAverage } from '../services/transformations'

export default function useStateData() {
  const [stateDays, setStateDays] = useState([])
  const stateId = useParams().id

  useEffect(async () => {
    const { data } = await fetch(
      `http://localhost:3000/api/v1/states/${stateId}/state_days`
    ).then((resp) => resp.json())
    const myState = data[0].attributes.state
    const dates = data.map((sd) => sd.attributes.date)
    const dailyCases = data.map((sd) => (sd.attributes.cases >= 0 ? sd.attributes.cases : 0))
    setStateDays([myState, sevenDayAverage(dates, dailyCases)])
  }, [])
  return stateDays
}
