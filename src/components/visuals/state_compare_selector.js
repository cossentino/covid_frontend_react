import React, { useEffect, useState } from 'react'

const StateCompareSelector = () => {
  const [myData, setData] = useState([])
  useEffect(async () => {
    const { data } = await fetch('http://localhost:3000/api/v1/states').then((resp) => resp.json())
    setData(data)
  }, [])

  return myData ? (
    <select className="mx-3">
      {myData.map((sn) => (
        <option value={sn.id} key={sn.id}>
          {sn.attributes.name}
        </option>
      ))}
    </select>
  ) : null
}

export default StateCompareSelector
