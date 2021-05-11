/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const StateGraph = ({ stateData, myState }) => {
  return <div className="container col-span-1">I am the state graph!</div>
}

export default StateGraph

StateGraph.propTypes = {
  stateData: PropTypes.object,
  myState: PropTypes.object
}
