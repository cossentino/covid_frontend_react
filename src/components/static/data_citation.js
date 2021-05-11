import React from 'react'

const DataCitation = () => (
  <p>
    COVID-19{' '}
    <a
      className=" text-blue-500 hover:underline hover:text-blue-800"
      href="https://github.com/nytimes/covid-19-data"
    >
      data
    </a>{' '}
    courtesy of New York Times&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Population{' '}
    <a
      className=" text-blue-500 hover:underline hover:text-blue-800"
      href="https://www.census.gov/programs-surveys/popest/data/data-sets.html"
    >
      data
    </a>{' '}
    courtesy of US Census Bureau
  </p>
)

export default DataCitation
