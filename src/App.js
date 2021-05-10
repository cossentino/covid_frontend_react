import './styles/app.css'
import React from 'react'
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom'
import Homepage from './pages/homepage'
import Header from './components/header'
import { STATE_COUNTIES_ENDPOINT } from './constants/routes'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path={STATE_COUNTIES_ENDPOINT}>
          <CountiesContainer />
        </Route>
      </Router>
    </div>
  )
}

export default App
