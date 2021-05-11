import './styles/app.css'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import Header from './components/header'
import CountiesContainer from './containers/counties_container'
import VisualsPage from './pages/visuals_page'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/states/:id/counties">
          <CountiesContainer />
        </Route>
        <Route path="/states/:id/visualize">
          <VisualsPage />
        </Route>
      </Router>
    </div>
  )
}

export default App
