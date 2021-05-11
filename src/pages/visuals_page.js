import React from 'react'
import StatesContainer from '../containers/states_container'
import DataCitation from '../components/static/data_citation'

export default function VisualsPage() {
  return (
    <div className="container gap-4 justify-between m-auto max-w-screen-lg">
      <StatesContainer />
      <DataCitation />
    </div>
  )
}
