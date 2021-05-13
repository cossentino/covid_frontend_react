import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { sevenDayAverage } from '../services/transformations'

export default function useStateData(startDate = null, endDate = null) {
  const [caseData, setCaseData] = useState([])
  const [stateInfo, setStateInfo] = useState({})
  const stateId = useParams().id

  useEffect(async () => {
    const urlBase = `http://localhost:3000/api/v1/states/${stateId}/state_days`
    let url = ''
    if (startDate && endDate) {
      url = `${urlBase}?start_date=${startDate}&end_date=${endDate}`
    } else if (startDate) {
      url = `${urlBase}?start_date=${startDate}`
    } else {
      url = urlBase
    }
    const { data } = await fetch(url).then((resp) => resp.json())
    const dates = data.map((sd) => sd.attributes.date)
    const dailyCases = data.map((sd) => (sd.attributes.cases >= 0 ? sd.attributes.cases : 0))
    setStateInfo(data[0].attributes.state)
    setCaseData(sevenDayAverage(dates, dailyCases))
  }, [startDate, endDate])

  return [stateInfo, caseData]
}

// This function fetches data from the StateDays endpoint of the rails API.
// It returns an array of structure [ {stateInfo}, [timeseriesData - cases/dates, length ~360]]
