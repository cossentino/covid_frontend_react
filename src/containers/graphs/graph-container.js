import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import fetchState from '../../services/fetch-state'
import GraphPage from '../../pages/graph-page'

const GraphContainer = () => {
  const [state1, setState1] = useState({})
  const [state2, setState2] = useState({})
  const [compareOn, setCompareOn] = useState(false)
  const [perCapitaOn, setPerCapitaOn] = useState(false)
  const [filterDates, setFilterDates] = useState({ start: null, end: null })

  const stateCode = useParams().abbrev
  const handleSelect = async (stateAbbrev) => {
    const myComparisonState = await fetchState(
      stateAbbrev,
      true,
      filterDates.start,
      filterDates.end
    )
    setState2(myComparisonState)
  }

  useEffect(() => {
    async function fetchData() {
      const stateDict1 = await fetchState(stateCode, true, filterDates.start, filterDates.end)
      setState1(stateDict1)
      if (Object.keys(state2).length > 0) {
        const stateDict2 = await fetchState(
          state2.stateAbbrev,
          true,
          filterDates.start,
          filterDates.end
        )
        setState2(stateDict2)
      }
    }
    fetchData()
  }, [stateCode, filterDates])

  return (
    <GraphPage
      state1={state1}
      state2={state2}
      dates={filterDates}
      setDates={setFilterDates}
      compareOn={compareOn}
      setCompareOn={setCompareOn}
      handleSelect={handleSelect}
      perCapitaOn={perCapitaOn}
      setPerCapitaOn={setPerCapitaOn}
    />
  )
}

export default GraphContainer
