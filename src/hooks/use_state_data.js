import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { sevenDayAverage } from '../services/transformations'
import { generateTimeSeriesUrl } from '../services/format'

export default function useStateData(startDate = null, endDate = null) {
  const [timeSeriesData, setTimeSeriesData] = useState([])
  const [stateInfo, setStateInfo] = useState({})
  const stateAbbrev = useParams().abbrev

  useEffect(async () => {
    const url = generateTimeSeriesUrl(stateAbbrev, startDate, endDate)
    const data = await fetch(url).then((resp) => resp.json())
    setTimeSeriesData(
      data.actualsTimeseries.map((series) => {
        return [series.date, series.cases]
      })
    )
    setStateInfo({
      stateName: stateAbbrev,
      population: data.population,
      lastUpdatedDate: data.lastUpdatedDate,
      totalCases: data.actuals.cases,
      totalDeaths: data.actuals.deaths
    })
  }, [stateAbbrev])
  return [stateInfo, timeSeriesData]
}

// This function fetches data from the StateDays endpoint of the rails API.
// It returns an array of structure [ {stateInfo}, [timeseriesData - cases/dates, length ~360]]
