import './styles/app.css'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import Header from './components/header'
import CountiesContainer from './containers/counties_container'
import GraphContainer from './containers/visuals/graph-container'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/states/:abbrev/counties">
          <CountiesContainer />
        </Route>
        <Route path="/states/:abbrev/visualize">
          <GraphContainer />
        </Route>
      </Router>
    </div>
  )
}

export default App
