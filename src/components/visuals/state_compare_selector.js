import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const StateCompareSelector = (props) => {
  const [myData, setData] = useState([])
  useEffect(async () => {
    const { data } = await fetch('http://localhost:3000/api/v1/states').then((resp) => resp.json())
    setData(data)
  }, [])

  return myData ? (
    <select
      className="mx-3 text-gray-500"
      onChange={(e) => {
        e.preventDefault()
        props.handleSelect(e.target.value)
      }}
    >
      <option disabled selected value>
        {' '}
        --Select a state--{' '}
      </option>
      {myData.map((sn) => (
        <option className="text-gray-900" value={sn.id} key={sn.id}>
          {sn.attributes.name}
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
