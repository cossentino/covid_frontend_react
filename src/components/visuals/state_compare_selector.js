import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const API_ENDPOINT =
  'https://api.covidactnow.org/v2/states.json?apiKey=229ed0d259874d8f94d9f0a34e1c1e28'

const StateCompareSelector = (props) => {
  const [stateNames, setStateNames] = useState([])

  useEffect(async () => {
    const data = await fetch(API_ENDPOINT).then((resp) => resp.json())
    const stateNameResponse = data.map((s) => s.state)
    setStateNames(stateNameResponse)
  }, [])

  return stateNames ? (
    <select
      className="mx-3 text-gray-500"
      onChange={(e) => {
        e.preventDefault()
        props.handleSelect(e.target.value)
      }}
    >
      <option disabled selected value>
        --Select a state--
      </option>
      {stateNames.map((sn) => (
        <option className="text-gray-900" value={sn} key={sn}>
          {sn}
        </option>
      ))}
    </select>
  ) : null
}

export default StateCompareSelector

StateCompareSelector.defaultProps = {
  handleSelect() {
    return null
  }
}

StateCompareSelector.propTypes = {
  handleSelect: PropTypes.func
}
